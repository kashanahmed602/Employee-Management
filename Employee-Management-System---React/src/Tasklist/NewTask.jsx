import React from 'react'
import axios from 'axios'

const NewTask = ({data, onClick}) => {

  const taskUpdation = async (e) => {
    e.stopPropagation();

    try{
    const response = await axios.put(`http://localhost:5000/api/v1/taskUpdate/${data._id}`, {
      type: "Active Task"
    });

    console.log(response.data);
    alert("Task Accepted");

    window.location.reload();
  }catch(error){
    console.log(error)
  }
  }

  return (
    <div onClick={onClick} className=' bg-amber-300 w-[23%] rounded-lg shrink-0'>
         <div className='flex items-center justify-between p-4'>
             <h5 className='border-1 font-extrabold border-red-600 bg-red-600 px-3 py-1 rounded-lg text-white '>{data.category}</h5>
             <h3 className='text-white font-bold'>{data.date}</h3>
        </div>
        <div className=' flex flex-col gap-5 mt-3 p-4 font-black text-white'>
            <h3 className='text-black text-xl'>{data.title}</h3>
            <h3 className=''>{data.description}</h3>
        </div>
        <div className='p-3 mt-3'>
            <button onClick={taskUpdation} className='w-full bg-blue-600 rounded-lg cursor-pointer active:scale-90 p-1 text-white font-bold'>Accept Task</button>
        </div>
    </div>
  )
}

export default NewTask