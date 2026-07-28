import React from 'react'

const FailedTask = ({data, onClick}) => {
  return (
    <div onClick={onClick} className=' bg-amber-300 w-[23%] rounded-lg shrink-0'>
         <div className='flex items-center justify-between p-4'>
             <h5 className='border-1 font-extrabold border-red-600 bg-red-600 px-3 py-1 rounded-lg text-white '>{data.category}</h5>
             <h3 className='text-white font-bold'>{data.date}</h3>
        </div>
        <div className=' flex flex-col gap-5 mt-3 p-4  font-black text-white'>
            <h3 className='text-black text-xl'>{data.title}</h3>
            <h3 className=''>{data.description}</h3>
        </div>
        <div className='p-3 mt-3'>
            <button className='w-full bg-red-600 rounded-lg p-1 text-white font-bold'>Failed!</button>
        </div>
    </div>
  )
}

export default FailedTask