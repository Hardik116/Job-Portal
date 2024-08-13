import React from 'react'
import { useNavigate } from 'react-router-dom'

function Log() {
    const navigate = useNavigate();
    const handleorg=()=>{
        navigate('/login')
    }
    const handleapplicant = ()=>{
        navigate("/applicantlogin")
    }
  return (
    <div className='login'>
        <h3>Log in as:</h3>
        <br />
        <div className='d-flex justify-content-around'>
            
      <button className='addjob' onClick={handleapplicant}>Applicant</button>
      <button className='addjob' onClick={handleorg}>Organization</button>
        </div>
    </div>
  )
}

export default Log
