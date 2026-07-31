import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import TaskModal from './TaskModal'

const AllTask = () => {
  const [employee, setEmployee] = useState([]);
  const [teams, setTeams] = useState([]);
  const [task, setTask] = useState([]);
  const [activeTab, setActiveTab] = useState('employees'); // 'employees' or 'teams'
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const deleteTeam = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete team "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/teamDelete/${id}`);
      alert("Team Deleted Successfully");
      setTeams(teams.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete team");
    }
  };

  const deleteEmployee = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete employee "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/employeeDelete/${id}`);
      alert("Employee Deleted Successfully");
      setEmployee(employee.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete employee");
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allTask`);
        console.log('all Task Response : ', response.data.task);
        setTask(response.data.task);
      }catch(error){
        console.log('error : ', error);
      }
    };

    const fetchEmployee = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);
        console.log('Employee Fetched : ', response.data.employee);
        setEmployee(response.data.employee);
      }catch(error){
        console.log("error", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTeam`);
        console.log('Teams Fetched:', response.data.team);
        setTeams(response.data.team || []);
      } catch(error) {
        console.log("error fetching teams", error);
      }
    };

    fetchTask();
    fetchEmployee();
    fetchTeams();
  },[])

  return (
    <div className="px-4 md:px-12 pb-16">
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 rounded bg-violet-500 inline-block"></span>
              Task Distribution Tracker
            </h2>
            <p className="text-gray-400 text-xs mt-1">Monitor task counts and progress across individual employees and teams</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('employees')}
              className={`flex-1 sm:flex-none px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'employees' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Employees ({employee.length})
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`flex-1 sm:flex-none px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'teams' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Teams ({teams.length})
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="hidden md:flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl mb-4">
          <span className="w-1/4">{activeTab === 'employees' ? 'Employee Name' : 'Team Name'}</span>
          <span className="w-[15%] text-center">New Tasks</span>
          <span className="w-[15%] text-center">Active Tasks</span>
          <span className="w-[15%] text-center">Completed</span>
          <span className="w-[15%] text-center">Failed</span>
          <span className="w-[15%] text-center">Actions</span>
        </div>

        {/* Data List */}
        <div className="space-y-4">
          {activeTab === 'employees' ? (
            employee.map((emp) => {
              const newCount = task.filter((t) => t.assign === emp._id && t.assignType !== 'team' && t.type === 'New Task').length;
              const activeCount = task.filter((t) => t.assign === emp._id && t.assignType !== 'team' && t.type === 'Active Task').length;
              const completedCount = task.filter((t) => t.assign === emp._id && t.assignType !== 'team' && t.type === 'Completed Task').length;
              const failedCount = task.filter((t) => t.assign === emp._id && t.assignType !== 'team' && t.type === 'Failed Task').length;

              return (
                <div
                  key={emp._id}
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setSelectedTeam(null);
                    setShowModal(true);
                  }}
                  className="flex flex-col md:flex-row md:justify-between md:items-center bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.12] rounded-xl p-5 md:px-6 md:py-4 transition-all duration-200 cursor-pointer gap-4"
                >
                  <div className="md:w-1/4 font-semibold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-sm font-bold">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{emp.name}</h4>
                      <p className="text-gray-400 text-xs font-normal">{emp.email}</p>
                    </div>
                  </div>

                  <div className="flex md:contents justify-between items-center text-sm">
                    <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                      <span className="md:hidden text-gray-400 font-medium">New:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs">{newCount}</span>
                    </div>
                    <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                      <span className="md:hidden text-gray-400 font-medium">Active:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs">{activeCount}</span>
                    </div>
                    <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                      <span className="md:hidden text-gray-400 font-medium">Completed:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">{completedCount}</span>
                    </div>
                    <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                      <span className="md:hidden text-gray-400 font-medium">Failed:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 font-bold text-xs">{failedCount}</span>
                    </div>
                    <div className="md:w-[15%] text-center flex md:block justify-between w-full">
                      <span className="md:hidden text-gray-400 font-medium">Action:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEmployee(emp._id, emp.name);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-transparent text-rose-400 hover:text-white font-bold text-xs cursor-pointer transition-all duration-200 active:scale-[0.95]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            teams.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm font-medium">No Teams Created Yet. Use "Create Team" to get started.</div>
            ) : (
              teams.map((team) => {
                const newCount = task.filter((t) => t.assign === team._id && t.assignType === 'team' && t.type === 'New Task').length;
                const activeCount = task.filter((t) => t.assign === team._id && t.assignType === 'team' && t.type === 'Active Task').length;
                const completedCount = task.filter((t) => t.assign === team._id && t.assignType === 'team' && t.type === 'Completed Task').length;
                const failedCount = task.filter((t) => t.assign === team._id && t.assignType === 'team' && t.type === 'Failed Task').length;

                return (
                  <div
                    key={team._id}
                    onClick={() => {
                      setSelectedTeam(team);
                      setSelectedEmployee(null);
                      setShowModal(true);
                    }}
                    className="flex flex-col md:flex-row md:justify-between md:items-center bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.12] rounded-xl p-5 md:px-6 md:py-4 transition-all duration-200 cursor-pointer gap-4"
                  >
                    <div className="md:w-1/4 font-semibold text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm font-bold">
                        {team.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{team.name}</h4>
                        <p className="text-gray-400 text-xs font-normal">{team.members?.length || 0} members</p>
                      </div>
                    </div>

                    <div className="flex md:contents justify-between items-center text-sm">
                      <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                        <span className="md:hidden text-gray-400 font-medium">New:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs">{newCount}</span>
                      </div>
                      <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                        <span className="md:hidden text-gray-400 font-medium">Active:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs">{activeCount}</span>
                      </div>
                      <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                        <span className="md:hidden text-gray-400 font-medium">Completed:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">{completedCount}</span>
                      </div>
                      <div className="md:w-[15%] text-center flex md:block justify-between w-full border-b border-white/[0.03] md:border-b-0 pb-2 md:pb-0">
                        <span className="md:hidden text-gray-400 font-medium">Failed:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 font-bold text-xs">{failedCount}</span>
                      </div>
                      <div className="md:w-[15%] text-center flex md:block justify-between w-full">
                        <span className="md:hidden text-gray-400 font-medium">Action:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTeam(team._id, team.name);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-transparent text-rose-400 hover:text-white font-bold text-xs cursor-pointer transition-all duration-200 active:scale-[0.95]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal 
          employee={selectedEmployee} 
          team={selectedTeam}
          task={task} 
          onClose={() => {
            setShowModal(false);
            setSelectedEmployee(null);
            setSelectedTeam(null);
          }}
        />
      )}
    </div>
  );
};

export default AllTask;