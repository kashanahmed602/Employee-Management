import React from "react";
import { MdDelete } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react'
import TaskChatModal from "./TaskChatModal";

const TaskModal = ({ employee, team, task, onClose }) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  if (!employee && !team) return null;

  const isTeam = !!team;
  const targetName = isTeam ? team.name : employee.name;

  const targetTasks = task.filter((t) => 
    isTeam 
      ? (t.assign === team._id && t.assignType === 'team')
      : (t.assign === employee._id && t.assignType !== 'team')
  );

  const newTasks = targetTasks.filter((t) => t.type === "New Task");
  const activeTasks = targetTasks.filter((t) => t.type === "Active Task");
  const completedTasks = targetTasks.filter((t) => t.type === "Completed Task");
  const failedTasks = targetTasks.filter((t) => t.type === "Failed Task");

  const taskDeleted = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/taskdelete/${id}`);
      alert("Task Deleted");
      window.location.reload();
    } catch(error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete task");
    }
  }

  const renderTask = (taskList, categoryColorClass) => {
    if (taskList.length === 0) {
      return (
        <p className="text-gray-500 text-sm font-medium py-2">
          No tasks in this stage.
        </p>
      );
    }

    return taskList.map((taskItem) => (
      <div
        key={taskItem._id}
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-3 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full">
              {taskItem.category}
            </span>
            <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
              {taskItem.title}
            </h3>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => {
                setSelectedTask(taskItem);
                setShowChat(true);
              }}
              className="p-2 text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors cursor-pointer"
              title="Discussion Chat"
            >
              <FaComments className="text-lg" />
            </button>

            <button
              onClick={() => taskDeleted(taskItem._id)}
              className="p-2 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              title="Delete Task"
            >
              <MdDelete className="text-lg" />
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-xs mt-2 line-clamp-3 leading-relaxed">
          {taskItem.description}
        </p>

        <div className="flex justify-between mt-3.5 pt-3 border-t border-white/[0.04] text-[10px] font-semibold text-gray-500">
          <span>Due: {new Date(taskItem.date).toLocaleDateString()}</span>
          <span className="capitalize">{taskItem.assignType || 'Employee'} Task</span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-[#0e0f15]/95 border border-white/[0.08] w-full max-w-4xl h-[85vh] rounded-2xl p-6 md:p-8 overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center pb-4 border-b border-white/[0.06] mb-6">
            <div>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">
                {isTeam ? 'Team Scope' : 'Employee Scope'}
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                {targetName}'s Tasks
              </h1>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-gray-300 text-xs font-semibold cursor-pointer transition-all"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-y-auto pr-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <h2 className="text-indigo-400 text-sm font-bold uppercase tracking-wider">
                  New ({newTasks.length})
                </h2>
              </div>
              <div className="space-y-1">{renderTask(newTasks)}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h2 className="text-amber-400 text-sm font-bold uppercase tracking-wider">
                  Active ({activeTasks.length})
                </h2>
              </div>
              <div className="space-y-1">{renderTask(activeTasks)}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-wider">
                  Completed ({completedTasks.length})
                </h2>
              </div>
              <div className="space-y-1">{renderTask(completedTasks)}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <h2 className="text-rose-400 text-sm font-bold uppercase tracking-wider">
                  Failed ({failedTasks.length})
                </h2>
              </div>
              <div className="space-y-1">{renderTask(failedTasks)}</div>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <TaskChatModal
          task={selectedTask}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default TaskModal;