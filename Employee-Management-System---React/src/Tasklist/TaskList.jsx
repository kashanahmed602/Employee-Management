import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import AcceptTask from './AcceptTask'
import CompletedTask from './CompletedTask'
import FailedTask from './FailedTask'
import NewTask from './NewTask'
import TaskDetailModal from './TaskDetailModal'

const TaskList = ({ data, selectedType }) => {

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTask = async (req, res) =>{
      try{

        const user = JSON.parse(localStorage.getItem('user'));

        if(!user) return;

        const response = await axios.get(`http://localhost:5000/api/v1/allTask/${user._id}`);
        console.log('response data', response.data.task);
        setTasks(response.data.task);
      }catch(error){
        console.log('Task fetched error', error);
      }
    };

    fetchTask();
  },[])

  const filteredTasks = selectedType === "All" ? tasks : tasks.filter(task => task.type === selectedType);

    if (filteredTasks.length === 0) {
    return (
      <div className="text-white text-center mt-10 text-2xl">
        No Tasks Available
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-white text-center mt-10 text-2xl">
        No Tasks Available
      </div>
    );
  }

  return (
    <>
    <div id='taskList' className='mt-8 overflow-x-auto w-full p-8 flex gap-5 flex-nowrap'>

      {filteredTasks.map((elem) => (

        <React.Fragment key={elem._id}>

          {elem.type === "New Task" &&
            <NewTask data={elem} onClick={() => {setSelectedTask(elem); setShowModal(true);}}/>}

          {elem.type === "Active Task" &&
            <AcceptTask data={elem} onClick={() => {setSelectedTask(elem); setShowModal(true);}}/>}

          {elem.type === "Completed Task" &&
            <CompletedTask data={elem} onClick={() => {setSelectedTask(elem); setShowModal(true);}}/>}

          {elem.type === "Failed Task" &&
            <FailedTask data={elem} onClick={() => {setSelectedTask(elem); setShowModal(true);}}/>}

        </React.Fragment>

      ))}

    </div>

    {
      showModal && (<TaskDetailModal task={selectedTask} onClose={()=> setShowModal(false)} />
    )
    }
    </>
  )
}

export default TaskList