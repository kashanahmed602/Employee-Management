import React from 'react'
import axios from 'axios';

const AcceptTask = ({data}, onClick) => {

  const taskUpdationComplete = async (e) =>{
    e.stopPropagation();

    try{
      const response = await axios.put(`${import.meta.env.API_VITE_URL}/taskUpdate/${data._id}`,{
        type: "Completed Task"
      });

      console.log(response.data);
      alert("Task Completed");
      window.location.reload();

    }catch(error){
      console.log(error)
      alert(error)
    }
  }

  const taskUpdationFailed = async (e) =>{
    e.stopPropagation();

    try{
      const response = await axios.put(`${import.meta.env.API_VITE_URL}/taskUpdate/${data._id}`,{
        type: "Failed Task"
      });

      console.log(response.data);
      alert("Task Completed");
      window.location.reload();

    }catch(error){
      console.log(error)
      alert(error)
    }
  }


  console.log(data.title)
  return (
     <div onClick={onClick} className=' bg-amber-300 w-[23%] rounded-lg shrink-0'>
            <div className='flex items-center justify-between p-4'>
             <h5 className='border-1 font-extrabold border-red-600 text-sm bg-red-600 px-3 py-1 rounded-lg text-white '>{data.category}</h5>
             <h3 className='text-white font-bold'>{data.date}</h3>
        </div>
        <div className=' flex flex-col gap-5 mt-4 p-4 font-black text-white'>
            <h3 className='text-xl text-black'>{data.title}</h3>
            <h3>{data.description}</h3>
        </div>
        <div className='flex justify-between p-3 text-sm'>
        <button onClick={taskUpdationComplete} className='bg-green-400 p-1 rounded-lg font-bold text-white cursor-pointer active:scale-90'>Mark as Completed!</button>
        <button onClick={taskUpdationFailed} className=' bg-red-600 p-1 rounded-lg font-bold text-white cursor-pointer active:scale-90'>Mark as Failed!</button>
        </div>
        </div>
  )
}

export default AcceptTask