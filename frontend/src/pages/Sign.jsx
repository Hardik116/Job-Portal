import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sign() {
    const navigate = useNavigate();
    const handleorg=()=>{
        navigate('/signup')
    }
    const handleapplicant = ()=>{
        navigate("/applicantsignup")
    }
  return (
    <div className='login'>
        <h3>Sign up as:</h3>
        <br />
        <div className='d-flex justify-content-around'>
            
      <button className='addjob' onClick={handleapplicant}>Applicant</button>
      <button className='addjob' onClick={handleorg}>Organization</button>
        </div>
    </div>
  )
}

export default Sign
