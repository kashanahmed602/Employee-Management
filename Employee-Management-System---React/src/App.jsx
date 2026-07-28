import { useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
// import AdminDashboard from '../../admin-client/src/Dashboard/AdminDashboard';

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <>
    {
        !user && 
        <Login setUser={setUser}/>

    }

    {
        user && 
        <EmployeeDashboard 
        data={user}
        userChange={setUser}
        />

    }
    </>
  )
}

export default App;