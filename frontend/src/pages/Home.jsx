import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
 
  const handlejob=()=>{
    navigate('/addjob')
  }
  const handlegetjob=()=>{
    navigate('/getjob')
  }
  return (
    <div style={{marginLeft:"20px"}}>
      <h1>you are logged in</h1>
      <button className="addjob" onClick={handlejob}>Add job</button>
      <button className="addjob" onClick={handlegetjob}>Get all jobs</button>
    </div>
  )
}

export default Home
