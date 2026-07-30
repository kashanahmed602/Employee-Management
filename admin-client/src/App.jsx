import { useState } from "react";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Dashboard/AdminDashboard";

function App() {
  const [admin, setAdmin] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <>
      {!admin ? (
        <Login setAdmin={setAdmin} />
      ) : (
        <AdminDashboard admin={admin} setAdmin={setAdmin} />
      )}
    </>
  );
}

export default App;