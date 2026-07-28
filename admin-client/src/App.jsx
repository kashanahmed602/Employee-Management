import { useState } from "react";
import Login from "./Components/Auth/Login";
import AdminDashboard from "./Dashboard/AdminDashboard";

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <>
      {!admin ? (
        <Login setAdmin={setAdmin} />
      ) : (
        <AdminDashboard admin={admin} />
      )}
    </>
  );
}

export default App;