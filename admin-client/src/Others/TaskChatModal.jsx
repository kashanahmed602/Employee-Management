import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskChatModal = ({ task, onClose }) => {

    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState("");

    useEffect(()=>{

        if(task){

        fetchChat();
        }
    },[task]);

    const fetchChat = async()=>{

        const res=await axios.get(
            `http://localhost:5000/api/v1/getTaskChat/${task._id}`
        );

        setMessages(res.data.chat);

    };

    const sendMessage=async()=>{

        if(message==="") return;

        await axios.post(
            `http://localhost:5000/api/v1/taskChat/${task._id}`,
            {
                sender:"admin",
                message
            }
        );

        setMessage("");

        fetchChat();

    };

    return(

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-[#1c1c1c] w-[600px] h-[650px] rounded-xl flex flex-col p-5">

                <div className="flex justify-between items-center">

                    <h2 className="text-white text-2xl font-bold">
                        {task.title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                    >
                        Close
                    </button>

                </div>

                <div className="flex-1 overflow-y-auto mt-5 bg-[#2b2b2b] rounded-lg p-4">

                    {
                        messages.map(msg=>(
                            <div
                                key={msg._id}
                                className={`mb-3 ${
                                    msg.sender==="admin"
                                    ?"text-right"
                                    :"text-left"
                                }`}
                            >

                                <div className="font-bold text-blue-400">
                                    {msg.sender}
                                </div>

                                <div className="bg-[#3a3a3a] inline-block p-2 rounded-lg text-white">
                                    {msg.message}
                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className="flex mt-4 gap-2">

                    <input
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        className="flex-1 bg-[#333] p-3 rounded-lg text-white outline-none"
                        placeholder="Type message..."
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 px-5 rounded-lg text-white"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>

    );

};

export default TaskChatModal;