import React from 'react';

const Header = (props) => {

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    props.setAdmin(null);
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b10]/80 backdrop-blur-md border-b border-white/[0.06] px-4 md:px-12 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          A
        </div>
        <div>
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Dashboard</span>
          <span className="text-white text-lg font-extrabold tracking-tight">Admin Console 👋</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 w-full md:w-auto">
        <button
          onClick={() => props.setShowMakeTeam(true)}
          className="flex-1 md:flex-initial text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] px-5 py-2.5 text-sm font-semibold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
        >
          Create Team
        </button>

        <button
          onClick={() => props.setShowAddEmp(true)}
          className="flex-1 md:flex-initial text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 text-sm font-semibold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer text-center shadow-lg shadow-violet-900/10"
        >
          Add Employee
        </button>

        <button
          onClick={logOut}
          className="flex-1 md:flex-initial text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-transparent px-5 py-2.5 text-sm font-semibold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
        >
          Log Out
        </button>
      </div>
    </header>
  )
}

export default Header;