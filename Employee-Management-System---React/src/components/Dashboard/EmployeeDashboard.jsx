import React from 'react'
import Header from '../../others/Header'
import TaskListNumber from '../../others/TaskListNumber'
import TaskList from '../../Tasklist/TaskList'
import MyTeams from './MyTeams'
import { useEffect, useState } from 'react'
import axios from 'axios'

const EmployeeDashboard = ({ data, userChange }) => {
const [task, setTask] = useState([]);
const [selectedType, setSelectedType] = useState("All");
const [activeTab, setActiveTab] = useState("workspace"); // 'workspace' or 'teams'

useEffect(() => {
      const fetchedTask = async () => {
        try{
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/allTask/${data._id}`);

          console.log('response Task list : ', response.data.task);
          setTask(response.data.task);
        }catch(error){
           console.log("error task list : ",error) 
        }
      };
      if(data?._id){
        fetchedTask();
      }
},[data])

  return (
    <div className="min-h-screen bg-[#0a0b10] flex flex-col gap-4 pb-12">
      <Header data={data} userChange={userChange} />
      
      {/* View Tab Switcher */}
      <div className="px-4 md:px-12 pt-6 flex justify-start">
        <div className="flex bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'workspace' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            My Workspace
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'teams' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            My Teams
          </button>
        </div>
      </div>

      {activeTab === 'workspace' ? (
        <>
          <TaskListNumber task={task} selectedType={selectedType} setSelectedType={setSelectedType} /> 
          <TaskList data={task} selectedType={selectedType} />
        </>
      ) : (
        <MyTeams employeeId={data._id} allTasks={task} />
      )}
    </div>
  )
}

export default EmployeeDashboard
