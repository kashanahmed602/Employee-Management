import React from 'react'
import axios from 'axios';

const AcceptTask = ({data, teamName, onClick}) => {

  const taskUpdationComplete = async (e) =>{
    e.stopPropagation();

    try{
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/taskUpdate/${data._id}`,{
        type: "Completed Task"
      });

      console.log(response.data);
      alert("Task Completed");
      window.location.reload();

    }catch(error){
      console.log(error)
      alert(error.response?.data?.message || "Failed to update task");
    }
  }

  const taskUpdationFailed = async (e) =>{
    e.stopPropagation();

    try{
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/taskUpdate/${data._id}`,{
        type: "Failed Task"
      });

      console.log(response.data);
      alert("Task Failed");
      window.location.reload();

    }catch(error){
      console.log(error)
      alert(error.response?.data?.message || "Failed to update task");
    }
  }

  return (
    <div onClick={onClick} className="bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/50 hover:bg-white/[0.04] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-[280px] shadow-lg hover:shadow-amber-500/5 relative overflow-hidden group cursor-pointer">
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-lg pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
      
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            {data.category}
          </span>
          <span className="text-gray-400 text-xs font-semibold">
            {new Date(data.date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-amber-400 transition-colors">
          {data.title}
        </h3>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.04]">
        <div className="flex items-center justify-between mb-3">
          {teamName ? (
            <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20 max-w-[120px] truncate" title={`Team Task: ${teamName}`}>
              👥 {teamName}
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              👤 Personal
            </span>
          )}
          <span className="text-[10px] font-semibold text-amber-400">In Progress</span>
        </div>

        <div className="flex gap-2 text-xs">
          <button onClick={taskUpdationComplete} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl active:scale-[0.97] transition-all cursor-pointer text-center">
            Complete
          </button>
          <button onClick={taskUpdationFailed} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-xl active:scale-[0.97] transition-all cursor-pointer text-center">
            Fail
          </button>
        </div>
      </div>
    </div>
  )
}

export default AcceptTask