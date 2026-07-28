import React from 'react'
import Header from '../../others/Header'
import TaskListNumber from '../../others/TaskListNumber'
import TaskList from '../../Tasklist/TaskList'
import { useEffect, useState } from 'react'
import axios from 'axios'

const EmployeeDashboard = ({ data, userChange }) => {
const [task, setTask] = useState([]);
const [selectedType, setSelectedType] = useState("All");

useEffect(() => {
      const fetchedTask = async () => {
        try{
          const response = await axios.get(`http://localhost:5000/api/v1/allTask/${data._id}`);

          console.log('response Task list : ', response.data.task);
          setTask(response.data.task);
        }catch(error){
           console.log("error task list : ",error) 
        }
      };
      if(data?._id){
        fetchedTask();
      }
},[data])

  return (
    <div>
      <Header data={data} userChange={userChange} />
      <TaskListNumber task={task} selectedType={selectedType} setSelectedType={setSelectedType} /> 
      <TaskList data={task} selectedType={selectedType} />
    </div>
  )
}

export default EmployeeDashboard
