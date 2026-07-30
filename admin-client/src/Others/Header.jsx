import React from 'react'

const Header = (props) => {

  const logOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  props.setAdmin(null);
}

  const handleAdd = () => {
    console.log("Add Button Clicked");
    // Yahan Add Employee ka modal ya page open karna hai
  }

  return (
    <div className='flex justify-between p-6 px-12 items-center'>
      <h1 className='text-white text-xl'>
        Hello, <br />
        <span className='text-2xl font-bold'>
          Admin 👋
        </span>
      </h1>

      <div className='flex gap-4'>

        <button
          onClick={()=> props.setShowMakeTeam(true)}
          className='text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 text-xl rounded-lg active:scale-90'
        >
          Make Team
        </button>


        <button
          onClick={()=> props.setShowAddEmp(true)}
          className='text-white bg-green-600 hover:bg-green-700 px-5 py-3 text-xl rounded-lg active:scale-90'
        >
          Add
        </button>

        <button
          onClick={logOut}
          className='text-white ring-2 ring-white hover:ring-red-600 hover:text-red-600 hover:bg-white active:scale-90 cursor-pointer bg-red-600 px-5 py-3 text-xl rounded-lg'
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Header