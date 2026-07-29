import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import TaskModal from './TaskModal'

const AllTask = () => {

  const [employee, setEmployee] = useState([]);
  const [task, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchTask = async (req, res) => {
      try{

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allTask`);
        console.log('all Task Response : ', response.data.task);
        setTask(response.data.task);

      }catch(error){
        console.log('error : ', error);
      }
    };

    const fetchEmployee = async (req, res) => {
      try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);
      console.log('Employee Fetched : ', response.data.employee);
      setEmployee(response.data.employee);

      }catch(error){
        console.log("error", error);
      }
    };

    fetchTask();
    fetchEmployee();
  },[])

  return (
    <>
    <div id="allTask" className="bg-[#1C1C1C] mt-8 p-4">

      <div className="h-12 bg-red-500 flex justify-between items-center text-xl px-2 w-full text-white rounded-lg font-bold mb-4">
        <h3 className="w-1/5">Employee Name</h3>
        <h3 className="w-1/5">Active Task</h3>
        <h3 className="w-1/5">New Task</h3>
        <h3 className="w-1/5">Completed Task</h3>
        <h3 className="w-1/5">Failed Task</h3>
      </div>


      {employee.map((emp) => {

        const activeCount = task.filter((tasks) => 
          tasks.assign === emp._id && tasks.type === 'Active Task').length;

        const newCount = task.filter((tasks) => 
        tasks.assign === emp._id && tasks.type === 'New Task').length;

        const completedCount = task.filter((tasks) => 
        tasks.assign === emp._id && tasks.type === 'Completed Task').length;

        const failedCount = task.filter((tasks) => 
        tasks.assign === emp._id && tasks.type === 'Failed Task').length;
      

      return(
         <div
            key={emp._id}
            onClick={() => {
              setSelectedEmployee(emp);
              setShowModal(true);
            }}
            className="h-12 border-2 border-green-500 flex justify-between items-center text-white rounded-lg px-2 mb-3"
          >
            <h3 className="w-1/5">{emp.name}</h3>
            <h3 className="w-1/5 text-blue-400">{activeCount}</h3>
            <h3 className="w-1/5 text-yellow-400">{newCount}</h3>
            <h3 className="w-1/5 text-green-400">{completedCount}</h3>
            <h3 className="w-1/5 text-red-400">{failedCount}</h3>
          </div>

      );
      })
      }
    

      <div className="h-14 flex justify-center items-center text-white text-xl">
        No More Employees Found
      </div>

    </div>

     {
  showModal && (<TaskModal employee={selectedEmployee} task={task} onClose={() => {setShowModal(false)}}/>
  )}
</>
  );

 
};

export default AllTask;