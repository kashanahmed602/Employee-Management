import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const AddEmp = ({ setShowAddEmp }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
            name,
            email,
            password,
            role: role || 'employee'
        });

        alert(response.data.message);
        console.log(response.data);

        setName("");
        setEmail("");
        setPassword("");
        setShowAddEmp(false);

    }catch(error){
        console.log(error);
        alert(error.response?.data?.message || "Error Adding Employee! Please try again later.");
    }finally{
        setLoading(false);
    }
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0e0f15]/95 border border-white/[0.08] p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        <button
          onClick={() => setShowAddEmp(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
        >
          ✕
        </button>

         <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
          Add New Employee
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="employee@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Access Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white outline-none focus:border-violet-500 focus:bg-white/[0.06] transition-all duration-200 text-sm font-medium [color-scheme:dark]"
            >
              <option value="employee" className="bg-[#121218] text-white">Employee</option>
              <option value="admin" className="bg-[#121218] text-white">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-900/20 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center text-sm uppercase tracking-wider"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Add Employee"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;