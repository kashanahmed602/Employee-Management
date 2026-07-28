import React from 'react';

const TaskListNumber = ({ task, selectedType, setSelectedType }) => {

  console.log("task list", task);

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

  return (
    <div className='flex gap-10 p-8 mt-10'>

       <div onClick={()=> setSelectedType('All')} className='h-30 w-[45%] bg-blue-500 p-5 rounded-lg'>
        <h1 className='text-white text-3xl font-extrabold'>{allTask}</h1>
        <h2 className='text-white text-2xl font-bold'>All Task</h2>
      </div>

      <div onClick={()=> setSelectedType('New Task')} className='h-30 w-[45%] bg-blue-500 p-5 rounded-lg'>
        <h1 className='text-white text-3xl font-extrabold'>{newTask}</h1>
        <h2 className='text-white text-2xl font-bold'>New Task</h2>
      </div>

      <div onClick={()=> setSelectedType('Completed Task')} className='h-30 w-[45%] bg-green-300 p-5 rounded-lg'>
        <h1 className='text-white text-3xl font-extrabold'>{completedTask}</h1>
        <h2 className='text-white text-2xl font-bold'>Completed</h2>
      </div>

      <div onClick={()=> setSelectedType('Active Task')} className='h-30 w-[45%] bg-amber-500 p-5 rounded-lg'>
        <h1 className='text-white text-3xl font-extrabold'>{acceptedTask}</h1>
        <h2 className='text-white text-2xl font-bold'>Accepted</h2>
      </div>

      <div onClick={()=> setSelectedType('Failed Task')} className='h-30 w-[45%] bg-red-500 p-5 rounded-lg'>
        <h1 className='text-white text-3xl font-extrabold'>{failedTask}</h1>
        <h2 className='text-white text-2xl font-bold'>Failed</h2>
      </div>

    </div>
  );
};

export default TaskListNumber;