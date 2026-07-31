import React from 'react'

const FailedTask = ({data, teamName, onClick}) => {
  return (
    <div onClick={onClick} className="bg-white/[0.02] border border-white/[0.06] hover:border-rose-500/50 hover:bg-white/[0.04] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-[280px] shadow-lg hover:shadow-rose-500/5 relative overflow-hidden group cursor-pointer">
      <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-lg pointer-events-none group-hover:bg-rose-500/10 transition-colors" />
      
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
            {data.category}
          </span>
          <span className="text-gray-400 text-xs font-semibold">
            {new Date(data.date).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-rose-400 transition-colors">
          {data.title}
        </h3>
        
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
          {data.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between gap-4">
        {teamName ? (
          <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20 max-w-[100px] truncate" title={`Team Task: ${teamName}`}>
            👥 {teamName}
          </span>
        ) : (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            👤 Personal
          </span>
        )}

        <button className="bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-xs px-4 py-2 rounded-xl pointer-events-none">
          Failed
        </button>
      </div>
    </div>
  )
}

export default FailedTask