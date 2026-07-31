import React, { useState } from "react";
import Header from "../Others/Header";
import AddTask from "../Others/AddTask";
import AllTask from "../Others/AllTask";
import AddEmp from "../Components/Auth/AddEmp";
import TeamModal from "../Others/TeamModal";

const AdminDashboard = ({ admin, setAdmin }) => {
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showMakeTeam, setShowMakeTeam] = useState(false);
  return (
    <div className="min-h-screen bg-[#0a0b10] flex flex-col gap-4 pb-12">

      <Header
        admin={admin}
        setAdmin={setAdmin}
        setShowAddEmp={setShowAddEmp}
        setShowMakeTeam={setShowMakeTeam}
      />

      {showAddEmp && (
        <AddEmp setShowAddEmp={setShowAddEmp} />
      )}

      {showMakeTeam && (
        <TeamModal setShowMakeTeam={setShowMakeTeam}/>
      )}

      <AddTask />

      <AllTask />

    </div>
  );
};

export default AdminDashboard;