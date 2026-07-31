import React from 'react';

const Header = (props) => {

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    props.userChange(null);
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b10]/80 backdrop-blur-md border-b border-white/[0.06] px-4 md:px-12 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {props.data?.name?.charAt(0).toUpperCase() || 'E'}
        </div>
        <div>
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">Workspace</span>
          <span className="text-white text-lg font-extrabold tracking-tight">Hello, {props.data?.name || 'Employee'} 👋</span>
        </div>
      </div>

      <div>
        <button
          onClick={logOut}
          className="text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-transparent px-5 py-2 text-xs font-semibold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
        >
          Log Out
        </button>
      </div>
    </header>
  )
}

export default Header;