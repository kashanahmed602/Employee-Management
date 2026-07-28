import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const AddEmp = ({ setShowAddEmp }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee")

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:5000/api/auth/register',{
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

        //close pop form
        setShowAddEmp(false);

    }catch{
        console.log(error);
        alert("Error Adding Employees! please try again later");

    }
}
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="w-[450px] rounded-xl bg-[#1f1f1f] p-8 relative">

        <button
          onClick={() => setShowAddEmp(false)}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

         <h2 className="text-3xl font-bold text-white text-center mb-6">
          Add Employee
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-[#2b2b2b] text-white outline-none"
            required
          />

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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded bg-[#2b2b2b] text-white outline-none">
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-green-600 py-3 rounded text-white">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;