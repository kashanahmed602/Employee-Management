import React from 'react';
import { useState } from 'react';
import axios  from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
        role: "employee"
      });

      setUser(response.data.user);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  } 

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0b10] px-4 relative overflow-hidden">
      {/* Background ambient glowing shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] border border-white/[0.07] backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 transition-all duration-300 hover:border-white/[0.12]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-bold text-2xl shadow-lg mb-4">
            E
          </div>
          <h2 className="text-white text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Employee Work Space Portal</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center font-medium animate-pulse">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="employee@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center text-sm uppercase tracking-wider"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;