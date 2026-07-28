import React from "react";
import { MdDelete } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import axios from 'axios';
import {useState} from 'react'
import TaskChatModal from "./TaskChatModal";


const TaskModal = ({ employee, task, onClose }) => {
  
  const [showChat, setShowChat] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  if (!employee) return null;

  const employeeTasks = task.filter(
    (t) => t.assign === employee._id
  );

  const newTasks = employeeTasks.filter(
    (t) => t.type === "New Task"
  );

  const activeTasks = employeeTasks.filter(
    (t) => t.type === "Active Task"
  );

  const completedTasks = employeeTasks.filter(
    (t) => t.type === "Completed Task"
  );

  const failedTasks = employeeTasks.filter(
    (t) => t.type === "Failed Task"
  );

  const taskDeleted = async (id) => {
    try{

      const response = await axios.delete(`http://localhost:5000/api/v1/taskdelete/${id}`);

      alert("Task Deleted");

      window.location.reload();

    }catch(error){
      console.log(error);
      alert(error);
    }
  }

  const renderTask = (tasks) => {
    if (tasks.length === 0) {
      return (
        <p className="text-gray-400 mb-4">
          No Task Available
        </p>
      );
    }

    return tasks.map((task) => (
      <div
        key={task._id}
        className="bg-[#2A2A2A] rounded-lg p-4 mb-3"
      >
        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold text-white">
            {task.title}
          </h3>

          <div className="flex gap-3">

    <FaComments
        className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700"
        onClick={()=>{
            setSelectedTask(task);
            setShowChat(true);
        }}
    />

    <MdDelete
        className="text-red-500 text-3xl cursor-pointer hover:text-red-700"
        onClick={()=>taskDeleted(task._id)}
    />

</div>

        </div>

        <p className="text-gray-300 mt-3">
          {task.description}
        </p>


        <div className="flex justify-between mt-3 text-sm text-gray-400">
          <span>{task.category}</span>
          <span>
            {new Date(task.date).toLocaleDateString()}
          </span>
        </div>
      </div>
 
    ));

  };

  return (
    <>
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#1C1C1C] w-[900px] h-[700px] rounded-xl p-6 overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl text-white font-bold">
            {employee.name}'s Tasks
          </h1>

          <button
            onClick={onClose}
            className="bg-red-500 px-5 py-2 rounded text-white font-bold"
          >
            Close
          </button>

        </div>

        <div>

          <h2 className="text-blue-400 text-2xl font-bold mb-3">
            New Tasks
          </h2>
          {renderTask(newTasks)}

          <h2 className="text-yellow-400 text-2xl font-bold mb-3 mt-6">
            Active Tasks
          </h2>
          {renderTask(activeTasks)}

          <h2 className="text-green-400 text-2xl font-bold mb-3 mt-6">
            Completed Tasks
          </h2>
          {renderTask(completedTasks)}

          <h2 className="text-red-400 text-2xl font-bold mb-3 mt-6">
            Failed Tasks
          </h2>
          {renderTask(failedTasks)}

        </div>

      </div>

    </div>

     {
    showChat &&
    <TaskChatModal
        task={selectedTask}
        onClose={()=>setShowChat(false)}
    />
}
</>
  );



};

export default TaskModal;