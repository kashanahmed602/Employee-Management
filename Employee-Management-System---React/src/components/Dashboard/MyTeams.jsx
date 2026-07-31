import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskDetailModal from '../../Tasklist/TaskDetailModal';

const MyTeams = ({ employeeId, allTasks }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState(allTasks || []);

  // Helper to normalize different ID shapes to string
  const normalizeId = (id) => {
    if (id === null || id === undefined) return '';
    if (typeof id === 'object') {
      if (id.$oid) return String(id.$oid);
      if (id.toString) return String(id.toString());
    }
    return String(id);
  };
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTeam`);
        const allTeams = response.data.team || [];

        console.log("response Team", allTeams);
        console.log("response Team data", response.data);

        
        // Filter teams where this employee is a member (compare normalized IDs)
        const filtered = allTeams.filter(team => 
          team.members && team.members.some(member => normalizeId(member.employeeId) === normalizeId(employeeId))
        );
        setMyTeams(filtered);
      } catch (error) {
        console.error("Error fetching teams for employee", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();

    // fetch tasks for this employee as well (ensure we have latest tasks)
    const fetchTasks = async () => {
      if (!employeeId) return;
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/allTask`);
        setTasks(resp.data.task || []);

        console.log("response team task", resp.data.task);
        console.log("response team task data", resp.data);


      } catch (err) {
        console.error('Error fetching tasks for employee in MyTeams:', err);
      }
    };

    fetchTasks();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (myTeams.length === 0) {
    return (
      <div className="px-4 md:px-12 py-10">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 text-center text-gray-500 font-medium">
          You are not currently assigned to any teams. Contact your administrator to join a team.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 rounded bg-emerald-500 inline-block"></span>
          My Teams
        </h2>
        <p className="text-gray-400 text-xs mt-1">Overview of your teams, teammates, and collaborative tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {myTeams.map((team) => {
          // Find tasks assigned to this team (use normalizeId for robustness)
          const teamTasks = tasks.filter(task => normalizeId(task.assign) === normalizeId(team._id) && task.assignType === 'team');
          const newTasks = teamTasks.filter(t => t.type === 'New Task');
          const activeTasks = teamTasks.filter(t => t.type === 'Active Task');
          const completedTasks = teamTasks.filter(t => t.type === 'Completed Task');
          const failedTasks = teamTasks.filter(t => t.type === 'Failed Task');

          return (
            <div 
              key={team._id} 
              className="bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.04]">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">{team.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{team.members?.length || 0} members active</p>
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Teammates</h4>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1">
                    {team.members.map((member) => (
                      <div 
                        key={String(member.employeeId)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          String(member.employeeId) === String(employeeId) 
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                            : 'bg-white/[0.03] border border-white/[0.05] text-gray-300'
                        }`}
                        title={member.email}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          String(member.employeeId) === String(employeeId) 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{member.name} {String(member.employeeId) === String(employeeId) && "(You)"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Tasks */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Team Tasks ({teamTasks.length})</h4>
                  
                  {teamTasks.length === 0 ? (
                    <p className="text-gray-500 text-xs font-medium py-2">No tasks assigned to this team.</p>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {/* New Tasks list */}
                      {newTasks.map(t => (
                        <div 
                          key={t._id} 
                          onClick={() => { setSelectedTask(t); setShowModal(true); }}
                          className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.1] rounded-xl cursor-pointer transition-all"
                        >
                          <span className="text-white text-xs font-bold truncate max-w-[70%]">{t.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-bold">New</span>
                        </div>
                      ))}

                      {/* Active Tasks list */}
                      {activeTasks.map(t => (
                        <div 
                          key={t._id} 
                          onClick={() => { setSelectedTask(t); setShowModal(true); }}
                          className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.1] rounded-xl cursor-pointer transition-all"
                        >
                          <span className="text-white text-xs font-bold truncate max-w-[70%]">{t.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 font-bold">Active</span>
                        </div>
                      ))}

                      {/* Completed Tasks list */}
                      {completedTasks.map(t => (
                        <div 
                          key={t._id} 
                          onClick={() => { setSelectedTask(t); setShowModal(true); }}
                          className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.1] rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100"
                        >
                          <span className="text-white text-xs font-bold truncate max-w-[70%] line-through">{t.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold">Completed</span>
                        </div>
                      ))}

                      {/* Failed Tasks list */}
                      {failedTasks.map(t => (
                        <div 
                          key={t._id} 
                          onClick={() => { setSelectedTask(t); setShowModal(true); }}
                          className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.1] rounded-xl cursor-pointer transition-all opacity-70 hover:opacity-100"
                        >
                          <span className="text-white text-xs font-bold truncate max-w-[70%]">{t.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 font-bold">Failed</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && selectedTask && (
        <TaskDetailModal 
          task={selectedTask}
          teamName={myTeams.find(t => normalizeId(t._id) === normalizeId(selectedTask.assign))?.name || 'Team'}
          onClose={() => { setShowModal(false); setSelectedTask(null); }}
        />
      )}
    </div>
  );
};

export default MyTeams;
