import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postjob } from "../redux/jobslice"
import { useNavigate } from "react-router-dom"

const Addjob = () => {
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  const{user,error,loading} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();


const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
        console.log('User ID:', user.id);
        console.log('User Name:', user.name);
    }
    const user_id = user.id;
    const company = user.name;

    // Convert salary to number
    const salaryNumber = Number(salary);

    const jobcredential = { title, location, salary: salaryNumber, description, user_id, company };
    console.log(jobcredential);
    
    try {
        const resultAction = await dispatch(postjob(jobcredential));
        if (postjob.fulfilled.match(resultAction)) {
            // Check if job posting was successful
            const { payload } = resultAction;
            if (payload) {
                setSalary('');
                setLocation('')    
                setTitle('');
                setDescription('');
                navigate('/');
            }
        } else {
            console.log('Job posting failed:', resultAction.payload);
        }
    } catch (error) {
        console.error('Posting error:', error);
    }
};


  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Add  a Job</h3>
      <label>Title:</label>
      <input 
        type="String" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
      />
      <label>Location:</label>
      <input 
        type="String" 
        onChange={(e) => setLocation(e.target.value)} 
        value={location} 
      />
      <label>Salary:</label>
      <input 
        type="Number" 
        onChange={(e) => setSalary(e.target.value)} 
        value={salary} 
      />
      <label>Description:</label>
        <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        rows="4" 
        cols="50" 
        />


      <button > {loading ? "Loading..." : "Add Job"}</button>
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Addjob