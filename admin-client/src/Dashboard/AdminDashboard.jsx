import React, { useState } from "react";
import Header from "../Others/Header";
import AddTask from "../Others/AddTask";
import AllTask from "../Others/AllTask";
import AddEmp from "../Components/Auth/AddEmp";

const AdminDashboard = ({ admin, setAdmin }) => {
  const [showAddEmp, setShowAddEmp] = useState(false);

  return (
    <div className="min-h-screen bg-[#121111]">

      <Header
        admin={admin}
        setAdmin={setAdmin}
        setShowAddEmp={setShowAddEmp}
      />

      {showAddEmp && (
        <AddEmp setShowAddEmp={setShowAddEmp} />
      )}

      <AddTask />

      <AllTask />

    </div>
  );
};

export default AdminDashboard;