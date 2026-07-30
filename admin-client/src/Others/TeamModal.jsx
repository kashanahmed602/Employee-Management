import React, { useState } from "react";
// import { response } from "../../../server/src/app";
import axios from "axios";
import { useEffect } from "react";

const TeamModal = ({ setShowMakeTeam }) => {

  const [teamName, setTeamName] = useState("");
  const [employee, setEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(()=>{

  const fetchedEmp = async () =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);

        setEmployee(response.data.employee);
        console.log(response.data.employee);
    }catch(error){
        alert(error);
    }
  };

  fetchedEmp();

   },[setShowMakeTeam])

  const createTeam = async () =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/createTeam`,{
            name: teamName,
            members: selectedEmployees.map(emp => emp._id)
        });

        setShowMakeTeam(false);
    }catch(error){
        console.log(error);
        alert(error);
    }
  }

  // Dummy Employees
  // const employees = [
  //   "Ali",
  //   "Ahmed",
  //   "Usman",
  //   "Bilal",
  //   "Hamza",
  //   "Areeb",
  //   "Kashan",
  // ];

  const handleSelect = (e) => {

    const selectedEmployee = employee.find(
        emp => emp._id === e.target.value
    );

    if(
        selectedEmployee &&
        !selectedEmployees.some(
            emp => emp._id === selectedEmployee._id
        )
    ){
        setSelectedEmployees([
            ...selectedEmployees,
            selectedEmployee
        ]);
    }

    e.target.value="";
}

  const removeEmployee = (employee) => {
    setSelectedEmployees(
      selectedEmployees.filter((emp) => emp !== employee)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-[#1f1f1f] w-[600px] rounded-xl p-8">

        <h2 className="text-white text-3xl font-bold mb-8">
          Create Team
        </h2>

        {/* Team Name */}

        <div className="mb-6">

          <label className="text-gray-300 block mb-2">
            Team Title
          </label>

          <input
            type="text"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#2b2b2b] text-white outline-none"
          />

        </div>

        {/* Employee Dropdown */}

        <div className="mb-4">

          <label className="text-gray-300 block mb-2">
            Add Employees
          </label>

          <select
            onChange={handleSelect}
            className="w-full p-3 rounded-lg bg-[#2b2b2b] text-white outline-none"
          >

            <option value="">
              Select Employee
            </option>

            {employee.map((emp) => (

              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>

            ))}

          </select>

        </div>

        {/* Selected Employees */}

        <div className="flex flex-wrap gap-3 mb-8">

          {selectedEmployees.map((emp) => (

            <div
              key={emp._id}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full text-white"
            >

              <span>{emp.name}</span>

              <button
                onClick={() => removeEmployee(emp)}
                className="font-bold hover:text-red-300"
              >
                ×
              </button>

            </div>

          ))}

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            onClick={() => setShowMakeTeam(false)}
            className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={createTeam}
            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          >
            Create Team
          </button>

        </div>

      </div>

    </div>
  );
};

export default TeamModal;