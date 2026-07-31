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
  const [teamsMap, setTeamsMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTaskAndTeams = async () =>{
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allTask/${user._id}`);
        setTasks(response.data.task || []);

        // Fetch teams to map team IDs to names
        const teamsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/getTeam`);
        const map = {};
        if (teamsResponse.data?.team) {
          teamsResponse.data.team.forEach(t => {
            map[t._id] = t.name;
          });
        }
        setTeamsMap(map);
      }catch(error){
        console.log('Task fetched error', error);
      }
    };

    fetchTaskAndTeams();
  },[])

  const filteredTasks = selectedType === "All" ? tasks : tasks.filter(task => task.type === selectedType);

  if (!tasks || tasks.length === 0 || filteredTasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-20 text-base font-medium">
        No Tasks Available under "{selectedType}"
      </div>
    );
  }

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-12 pb-16">

      {filteredTasks.map((elem) => {
        const teamName = elem.assignType === 'team' ? (teamsMap[String(elem.assign)] || 'Team') : null;
        
        return (
          <React.Fragment key={elem._id}>

            {elem.type === "New Task" &&
              <NewTask 
                data={elem} 
                teamName={teamName}
                onClick={() => {setSelectedTask(elem); setShowModal(true);}}
              />}

            {elem.type === "Active Task" &&
              <AcceptTask 
                data={elem} 
                teamName={teamName}
                onClick={() => {setSelectedTask(elem); setShowModal(true);}}
              />}

            {elem.type === "Completed Task" &&
              <CompletedTask 
                data={elem} 
                teamName={teamName}
                onClick={() => {setSelectedTask(elem); setShowModal(true);}}
              />}

            {elem.type === "Failed Task" &&
              <FailedTask 
                data={elem} 
                teamName={teamName}
                onClick={() => {setSelectedTask(elem); setShowModal(true);}}
              />}

          </React.Fragment>
        );
      })}

    </div>

    {
      showModal && (
        <TaskDetailModal 
          task={selectedTask} 
          teamName={selectedTask.assignType === 'team' ? (teamsMap[String(selectedTask.assign)] || 'Team') : null}
          onClose={()=> setShowModal(false)} 
        />
      )
    }
    </>
  )
}

export default TaskList