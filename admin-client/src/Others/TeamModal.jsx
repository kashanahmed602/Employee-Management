import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamModal = ({ setShowMakeTeam, editingTeam = null, onTeamUpdated }) => {
  const isEditMode = Boolean(editingTeam?._id);

  const [teamName, setTeamName] = useState(editingTeam?.name || "");
  const [employee, setEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(
    editingTeam?.members?.map((member) => ({
      _id: member.employeeId,
      name: member.name,
      email: member.email,
    })) || []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedEmp = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);
        setEmployee(response.data.employee);
      } catch (error) {
        alert(error);
      }
    };

    fetchedEmp();
  }, []);

  useEffect(() => {
    setTeamName(editingTeam?.name || "");
    setSelectedEmployees(
      editingTeam?.members?.map((member) => ({
        _id: member.employeeId,
        name: member.name,
        email: member.email,
      })) || []
    );
  }, [editingTeam]);

  const closeModal = () => {
    setShowMakeTeam(false);
  };

  const submitTeam = async () => {
    if (!teamName) return alert("Please enter team name");
    if (selectedEmployees.length === 0) return alert("Please select at least one employee");

    setLoading(true);

    try {
      const payload = {
        name: teamName,
        members: selectedEmployees.map((emp) => emp._id),
      };

      if (isEditMode) {
        await axios.put(`${import.meta.env.VITE_API_URL}/teamUpdate/${editingTeam._id}`, payload);
        alert("Team Updated Successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/createTeam`, payload);
        alert("Team Created Successfully");
      }

      if (onTeamUpdated) onTeamUpdated();
      closeModal();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || (isEditMode ? "Failed to update team" : "Failed to create team"));
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    const selectedEmployee = employee.find((emp) => emp._id === e.target.value);

    if (
      selectedEmployee &&
      !selectedEmployees.some((emp) => emp._id === selectedEmployee._id)
    ) {
      setSelectedEmployees([...selectedEmployees, selectedEmployee]);
    }

    e.target.value = "";
  };

  const removeEmployee = (employeeToRemove) => {
    setSelectedEmployees(
      selectedEmployees.filter((emp) => emp._id !== employeeToRemove._id)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#0e0f15]/95 border border-white/[0.08] p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-white text-center mb-8 tracking-tight">
          {isEditMode ? "Edit Team" : "Create New Team"}
        </h2>

        <div className="mb-6">
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Team Title
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Squad, Marketing team"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-gray-500 outline-none focus:border-violet-500 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm font-medium"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Add Members
          </label>
          <select
            onChange={handleSelect}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white outline-none focus:border-violet-500 focus:bg-white/[0.06] transition-all duration-200 text-sm font-medium [color-scheme:dark]"
          >
            <option value="" className="bg-[#121218] text-white">Select Employee</option>
            {employee.map((emp) => (
              <option key={emp._id} value={emp._id} className="bg-[#121218] text-white">
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEmployees.length > 0 && (
          <div className="mb-8">
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Selected Members ({selectedEmployees.length})
            </label>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl">
              {selectedEmployees.map((emp) => (
                <div
                  key={emp._id}
                  className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full text-violet-300 text-xs font-semibold"
                >
                  <span>{emp.name}</span>
                  <button
                    onClick={() => removeEmployee(emp)}
                    className="w-4 h-4 flex items-center justify-center font-bold hover:text-white rounded-full hover:bg-violet-500/20 transition-all cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-gray-300 text-sm font-semibold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submitTeam}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-900/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Team" : "Create Team"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;