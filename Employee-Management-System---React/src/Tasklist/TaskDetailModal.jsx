import React from "react";
import axios from 'axios';
import {useState, useEffect} from 'react'

const TaskDetailModal = ({ task, onClose }) => {

  const [message, setMessage] = useState("");
  const [getMessage, setGetMessage] = useState([]);

  useEffect(() =>{
    if(task){
      fetchChat();
    }
  },[task])

   const fetchChat = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTaskChat/${task._id}`);
        setGetMessage(response.data.chat);
      }catch(error){
        console.log(error);
      }
    };


  const addChat = async () => {
    try{
      const response = await axios.post(`${import.meta.env.API_VITE_URL}/taskChat/${task._id}`,{
        sender: "employee",
        message
      });

      setMessage("");
      fetchChat();

    }catch(error){
      console.log(error);
    }
  }

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#1C1C1C] text-white w-[700px] rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-3xl font-bold">
            Task Details
          </h1>

          <button
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        <div className="space-y-4 text-lg">

          <p>
            <strong>Title :</strong> {task.title}
          </p>

          <p>
            <strong>Category :</strong> {task.category}
          </p>

          <p>
            <strong>Status :</strong> {task.type}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date(task.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Description :</strong>
          </p>

          <div className="bg-[#2a2a2a] rounded-lg p-4">
            {task.description || "No Description"}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">
Task Discussion
</h2>

<div className="bg-[#2A2A2A] rounded-lg p-4 h-72 overflow-y-auto">

  {getMessage.map((msg) => (

    <div
      key={msg._id}
      className={`mb-5 flex ${
        msg.sender === "admin"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div className="max-w-[70%]">

        <h4
          className={`font-bold mb-1 ${
            msg.sender === "admin"
              ? "text-right text-blue-400"
              : "text-left text-blue-400"
          }`}
        >
          {msg.sender}
        </h4>

        <div className="bg-[#3A3A3A] text-white px-4 py-2 rounded-lg inline-block">
          {msg.message}
        </div>

      </div>

    </div>

  ))}

</div>

<div className="flex mt-4 gap-2">

  <input
    value={message}
    type="text"
    placeholder="Type message..."
    onChange= {(e) => setMessage(e.target.value)}
    className="flex-1 bg-[#333] rounded-lg p-3 outline-none text-white"
  />

  <button onClick={addChat}
    className="bg-blue-600 px-6 rounded-lg text-white font-bold"
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