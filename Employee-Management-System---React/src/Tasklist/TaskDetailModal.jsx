import React from "react";
import axios from 'axios';
import {useState, useEffect} from 'react'

const TaskDetailModal = ({ task, teamName, onClose }) => {

  const [message, setMessage] = useState("");
  const [getMessage, setGetMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() =>{
    if(task){
      fetchChat();
    }
  },[task])

   const fetchChat = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTaskChat/${task._id}`);
        setGetMessage(response.data.chat || []);
      }catch(error){
        console.log(error);
      }
    };

  const addChat = async () => {
    if(message.trim() === "") return;
    setLoading(true);
    try{
      const senderName = user ? user.name : "Employee";
      await axios.post(`${import.meta.env.VITE_API_URL}/taskChat/${task._id}`,{
        sender: senderName,
        message
      });
      setMessage("");
      fetchChat();
    }catch(error){
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const taskUpdation = async (newStatus) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/taskUpdate/${task._id}`, {
        type: newStatus
      });
      alert(`Task status updated to: ${newStatus}`);
      window.location.reload();
    } catch(error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update task status");
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#0e0f15]/95 border border-white/[0.08] w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center pb-4 border-b border-white/[0.06] mb-5">
          <div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Task Specs</span>
            <h1 className="text-xl font-extrabold text-white mt-0.5">
              Task Details
            </h1>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-gray-300 text-xs font-semibold cursor-pointer transition-all"
          >
            Close
          </button>
        </div>

        <div className="space-y-4 text-sm flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-gray-300">
              <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-1">Title</strong> 
              <span className="text-white font-bold">{task.title}</span>
            </p>
            <p className="text-gray-300">
              <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-1">Category & Scope</strong> 
              <span className="inline-flex gap-2 items-center">
                <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-400 font-bold">{task.category}</span>
                {teamName ? (
                  <span className="px-2 py-0.5 rounded text-xs bg-violet-500/10 text-violet-400 font-bold">👥 {teamName}</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 font-bold">👤 Personal</span>
                )}
              </span>
            </p>
            <p className="text-gray-300">
              <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-1">Current Status</strong> 
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                task.type === 'Completed Task' ? 'bg-emerald-500/10 text-emerald-400' :
                task.type === 'Failed Task' ? 'bg-rose-500/10 text-rose-400' :
                task.type === 'Active Task' ? 'bg-amber-500/10 text-amber-400' :
                'bg-blue-500/10 text-blue-400'
              }`}>
                {task.type}
              </span>
            </p>
            <p className="text-gray-300">
              <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-1">Due Date</strong> 
              <span className="text-white font-medium">{new Date(task.date).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Task Actions */}
          {(task.type === "New Task" || task.type === "Active Task") && (
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Task Action</span>
                <span className="text-white text-xs font-medium">Update the status of this task</span>
              </div>
              <div className="flex gap-2 text-xs">
                {task.type === "New Task" && (
                  <button 
                    onClick={() => taskUpdation("Active Task")} 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl active:scale-[0.97] transition-all cursor-pointer shadow-md shadow-indigo-900/10"
                  >
                    Accept Task
                  </button>
                )}
                {task.type === "Active Task" && (
                  <>
                    <button 
                      onClick={() => taskUpdation("Completed Task")} 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl active:scale-[0.97] transition-all cursor-pointer shadow-md shadow-emerald-900/10"
                    >
                      Complete Task
                    </button>
                    <button 
                      onClick={() => taskUpdation("Failed Task")} 
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl active:scale-[0.97] transition-all cursor-pointer shadow-md shadow-rose-900/10"
                    >
                      Fail Task
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <div>
            <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-1.5">Description</strong>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-gray-300 leading-relaxed text-xs">
              {task.description || "No description provided."}
            </div>
          </div>

          <div>
            <strong className="text-gray-500 uppercase tracking-wider text-xs block mb-2">Discussion Room</strong>
            <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-4 h-60 overflow-y-auto space-y-4">
              {getMessage.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-xs font-medium">
                  No discussion notes yet. Leave a message below.
                </div>
              ) : (
                getMessage.map((msg) => {
                  const isMe = user && (msg.sender === user.name || msg.sender === 'employee');
                  return (
                    <div
                      key={msg._id}
                      className={`flex flex-col ${
                        isMe ? "items-end" : "items-start"
                      }`}
                    >
                      <span className={`text-[9px] font-bold mb-1 px-1.5 py-0.5 rounded-full ${
                        msg.sender === "admin"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {msg.sender === "admin" ? "Admin" : (msg.sender === "employee" ? "Employee" : msg.sender)}
                      </span>

                      <div className={`p-3 rounded-2xl text-xs font-medium max-w-[85%] leading-relaxed break-words ${
                        isMe
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-white/[0.06] text-white border border-white/[0.05] rounded-tl-none"
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <input
              value={message}
              type="text"
              placeholder="Type discussion notes..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') addChat(); }}
              className="flex-1 bg-white/[0.03] border border-white/[0.08] px-4 py-3 rounded-xl text-white outline-none focus:border-emerald-500 focus:bg-white/[0.05] transition-all text-xs font-medium"
            />
            <button 
              onClick={addChat}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-6 rounded-xl shadow-lg shadow-teal-900/10 cursor-pointer disabled:opacity-50 flex items-center justify-center text-xs uppercase tracking-wider"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskDetailModal;