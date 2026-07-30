import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [assign, setAssign] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [assignType, setAssignType] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    const getTeams = async () => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/getTeam`);

          setTeams(response.data.team);
          console.log("Teams", response.data.team);
      }catch(error){
          alert(error);
      }
    };

    const getEmployees = async () =>{
      try{
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee`);

          console.log('employee response : ', response.data.employee);
          
          setEmployees(response.data.employee);
      }catch(error){
          console.log("error:",error);
      }
    };
      getEmployees();
      getTeams();
  },[assignType]);

  const handleForm = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/createTask`,{
          title,
          date,
          assign,
          assignType,
          category,
          description
        });

    }catch(error){
        console.log("Task error: ", error);
    }

    console.log({
      title,
      date,
      assign,
      category,
      description,
    });

    // alert("Task API will be connected later.");

    setTitle("");
    setDate("");
    setAssign("");
    setCategory("");
    setDescription("");
  };

  return (
    <>
    <form
      onSubmit={handleForm}
      className="h-[58%] bg-[#1C1C1C] w-full px-10 p-3 flex justify-between"
    >
      <div>
        <h3 className="font-bold text-white mb-1">Task Title</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black placeholder-white"
          type="text"
          placeholder="Enter Task..."
        />

        <h3 className="font-bold text-white mb-1">Date</h3>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 border-white bg-black text-white [color-scheme:dark]"
          type="date"
        />

        <h3 className="font-bold text-white mb-1">Assign Type</h3>
       <select
  value={assignType}
  onChange={(e) => setAssignType(e.target.value)}
  className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black"
>
  <option value="">Select Type</option>

    <option value="employee">Employee</option>
    <option value="team">Team</option>

</select>

        {assignType === 'employee' && (
            <>
           <h3 className="font-bold text-white mb-1">Assign To</h3>
       <select
  value={assign}
  onChange={(e) => setAssign(e.target.value)}
  className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black"
>
  <option value="">Select Employee</option>

  {employees.map((employee) => (
    <option key={employee._id} value={employee._id}>
      {employee.name}
    </option>
  ))}
</select>

     </>
        )}

 {assignType === 'team' && (
            <>
           <h3 className="font-bold text-white mb-1">Assign To</h3>
       <select
  value={assign}
  onChange={(e) => setAssign(e.target.value)}
  className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black"
>
  <option value="">Select Team</option>

  {teams.map((team) => (
    <option key={team._id} value={team._id}>
      {team.name}
    </option>
  ))}
</select>

     </>
        )}

        <h3 className="font-bold text-white mb-1">Category</h3>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black placeholder-white"
          type="text"
          placeholder="Development, Design..."
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-1">Description</h3>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none w-[30vw] rounded-lg p-2 mb-5 border-2 text-white border-white bg-black placeholder-white"
          rows={9}
        ></textarea>

        <br />

        <button className="bg-amber-400 font-bold text-xl text-white w-full rounded-lg p-2 active:scale-90 border-3 border-white cursor-pointer">
          Submit
        </button>
      </div>
    </form>
    </>
  );
};

export default AddTask;