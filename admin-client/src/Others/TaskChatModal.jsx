import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskChatModal = ({ task, onClose }) => {

    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        if(task){
            fetchChat();
        }
    },[task]);

    const fetchChat = async()=>{
        try {
            const res=await axios.get(
                `${import.meta.env.VITE_API_URL}/getTaskChat/${task._id}`
            );
            setMessages(res.data.chat || []);
        } catch(error) {
            console.error("fetchChat error", error);
        }
    };

    const sendMessage=async()=>{
        if(message.trim()==="") return;
        setLoading(true);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/taskChat/${task._id}`,
                {
                    sender:"admin",
                    message
                }
            );
            setMessage("");
            fetchChat();
        } catch(error) {
            console.error("sendMessage error", error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-55 p-4">
            <div className="bg-[#0e0f15]/95 border border-white/[0.08] w-full max-w-lg h-[600px] rounded-2xl flex flex-col p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.06]">
                    <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Discussion Room</span>
                        <h2 className="text-lg font-extrabold text-white mt-0.5 max-w-[280px] truncate" title={task.title}>
                            {task.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-gray-300 text-xs font-semibold cursor-pointer transition-all"
                    >
                        Close
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto my-5 bg-white/[0.01] border border-white/[0.04] rounded-xl p-4 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500 text-xs font-medium">
                            No messages yet. Start the conversation!
                        </div>
                    ) : (
                        messages.map(msg=>(
                            <div
                                key={msg._id}
                                className={`flex flex-col ${
                                    msg.sender === "admin"
                                    ? "items-end"
                                    : "items-start"
                                }`}
                            >
                                <span className={`text-[10px] font-bold mb-1 px-1.5 py-0.5 rounded-full ${
                                    msg.sender === "admin"
                                    ? "bg-violet-500/10 text-violet-400"
                                    : "bg-emerald-500/10 text-emerald-400"
                                }`}>
                                    {msg.sender === "admin" ? "Admin" : (msg.sender === "employee" ? "Employee" : msg.sender)}
                                </span>

                                <div className={`p-3 rounded-2xl text-xs font-medium max-w-[85%] leading-relaxed break-words ${
                                    msg.sender === "admin"
                                    ? "bg-violet-600 text-white rounded-tr-none"
                                    : "bg-white/[0.06] text-white border border-white/[0.05] rounded-tl-none"
                                }`}>
                                    {msg.message}
                                </div>
                                <span className="text-[9px] text-gray-500 font-semibold mt-1 px-1">
                                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex gap-2">
                    <input
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') sendMessage(); }}
                        className="flex-1 bg-white/[0.03] border border-white/[0.08] px-4 py-3 rounded-xl text-white outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-xs font-medium"
                        placeholder="Type message and press Enter..."
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-6 rounded-xl shadow-lg shadow-violet-900/10 cursor-pointer disabled:opacity-50 flex items-center justify-center text-xs uppercase tracking-wider"
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TaskChatModal;