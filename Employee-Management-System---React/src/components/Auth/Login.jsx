import React from 'react';
import { useState } from 'react';
import axios  from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5000/api/auth/login',{
          email,
          password,
          role: "employee"
      });

      setUser(response.data.user);

      console.log(response.data);

      localStorage.setItem('token', response.data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user) 
      );

    }catch(error){
      console.error(error);

      alert(error.response?.data?.message || "Login Failed");

    }
  } 

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-[#1f1f1f] p-8 rounded-xl w-[450px] relative">


                <h2 className="text-white text-3xl font-bold text-center mb-8">
                    Login
                </h2>

                <form className="space-y-5" onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded bg-[#2b2b2b] text-white outline-none"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded bg-[#2b2b2b] text-white outline-none"
                        required
                    />

                    <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;