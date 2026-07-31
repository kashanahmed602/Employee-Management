import React from 'react';

const TaskListNumber = ({ task, selectedType, setSelectedType }) => {

  const allTask = task.length || 0;

  const newTask = task.filter(
    (task) => task.type === "New Task"
  ).length || 0;

  const completedTask = task.filter(
    (task) => task.type === "Completed Task"
  ).length || 0;

  const acceptedTask = task.filter(
    (task) => task.type === "Active Task"
  ).length || 0;

  const failedTask = task.filter(
    (task) => task.type === "Failed Task"
  ).length || 0;

  const cardClasses = (type) => {
    const base = "relative overflow-hidden rounded-2xl p-5 border cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ";
    const active = selectedType === type 
      ? "bg-white/[0.06] border-violet-500 shadow-lg shadow-violet-500/10" 
      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]";
    return base + active;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 md:px-12 py-6">
      
      {/* All Tasks Counter */}
      <div 
        onClick={() => setSelectedType('All')} 
        className={cardClasses('All')}
      >
        <span className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
        <h1 className="text-3xl font-extrabold text-white tracking-tight">{allTask}</h1>
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">All Tasks</h2>
      </div>

      {/* New Tasks Counter */}
      <div 
        onClick={() => setSelectedType('New Task')} 
        className={cardClasses('New Task')}
      >
        <span className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-tight">{newTask}</h1>
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">New Tasks</h2>
      </div>

      {/* Accepted/Active Tasks Counter */}
      <div 
        onClick={() => setSelectedType('Active Task')} 
        className={cardClasses('Active Task')}
      >
        <span className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
        <h1 className="text-3xl font-extrabold text-amber-400 tracking-tight">{acceptedTask}</h1>
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">Active Tasks</h2>
      </div>

      {/* Completed Tasks Counter */}
      <div 
        onClick={() => setSelectedType('Completed Task')} 
        className={cardClasses('Completed Task')}
      >
        <span className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
        <h1 className="text-3xl font-extrabold text-emerald-400 tracking-tight">{completedTask}</h1>
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">Completed</h2>
      </div>

      {/* Failed Tasks Counter */}
      <div 
        onClick={() => setSelectedType('Failed Task')} 
        className={cardClasses('Failed Task')}
      >
        <span className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
        <h1 className="text-3xl font-extrabold text-rose-400 tracking-tight">{failedTask}</h1>
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">Failed</h2>
      </div>

    </div>
  );
};

export default TaskListNumber;