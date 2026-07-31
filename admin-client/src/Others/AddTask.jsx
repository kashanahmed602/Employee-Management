import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [assign, setAssign] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [assignType, setAssignType] = useState('');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getTeams = async () => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTeam`);
          setTeams(response.data.team);
          console.log("Teams", response.data.team);
      }catch(error){
          console.error(error);
      }
    };

    const getEmployees = async () =>{
      try{
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);
          console.log('employee response : ', response.data.employee);
          setEmployees(response.data.employee);
      }catch(error){
          console.log("error:",error);
      }
    };
      getEmployees();
      getTeams();
  },[assignType]);

  const handleForm = async (e) => {
    e.preventDefault();
    if(!title || !date || !assign || !assignType || !category) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);

    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/createTask`,{
          title,
          date,
          assign,
          assignType,
          category,
          description
        });
        alert("Task Created successfully");
        setTitle("");
        setDate("");
        setAssign("");
        setCategory("");
        setDescription("");
        window.location.reload();
    }catch(error){
        console.log("Task error: ", error);
        alert(error.response?.data?.message || "Failed to create task");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-12 py-8">
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 rounded bg-violet-500 inline-block"></span>
          Create New Task
        </h2>
        
        <form onSubmit={handleForm} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Task Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium"
                type="text"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Due Date</label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium [color-scheme:dark]"
                  type="date"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Assign Type</label>
                <select
                  value={assignType}
                  onChange={(e) => { setAssignType(e.target.value); setAssign(""); }}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium [color-scheme:dark]"
                  required
                >
                  <option value="" className="bg-[#121218] text-white">Select Type</option>
                  <option value="employee" className="bg-[#121218] text-white">Employee</option>
                  <option value="team" className="bg-[#121218] text-white">Team</option>
                </select>
              </div>
            </div>

            {assignType && (
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Assign To {assignType === 'employee' ? 'Employee' : 'Team'}
                </label>
                <select
                  value={assign}
                  onChange={(e) => setAssign(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium [color-scheme:dark]"
                  required
                >
                  <option value="" className="bg-[#121218] text-white">Select {assignType === 'employee' ? 'Employee' : 'Team'}</option>
                  {assignType === 'employee' 
                    ? employees.map((employee) => (
                        <option key={employee._id} value={employee._id} className="bg-[#121218] text-white">{employee.name}</option>
                      ))
                    : teams.map((team) => (
                        <option key={team._id} value={team._id} className="bg-[#121218] text-white">{team.name}</option>
                      ))
                  }
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium"
                type="text"
                placeholder="e.g. Development, UI/UX, Research"
                required
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex-1 flex flex-col mb-6">
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Task Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.05] transition-all text-sm font-medium min-h-[160px] resize-none"
                placeholder="Detail out the task requirements..."
                required
              ></textarea>
            </div>

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-900/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center text-sm uppercase tracking-wider"
            >
              {loading ? "Creating..." : "Submit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;