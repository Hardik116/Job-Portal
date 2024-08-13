import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signupapplicant } from "../redux/applicantslice"
import { useNavigate } from "react-router-dom"

const Applicantsignup = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const{applicant,error,loading} = useSelector((state)=>state.applicant)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const usercredential = { name, email, password,role,age };
        
        try {
          const resultAction = await dispatch(signupapplicant(usercredential));
          if (signupapplicant.fulfilled.match(resultAction)) {
            const { payload } = resultAction;
            if (payload) {  
              setName('');
              setRole('');
              setAge('');
              setEmail('');
              setPassword('');
              navigate('/applicanthome');
            }
          } else {
            console.log('Signup failed:', resultAction.payload);
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
      };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Name:</label>
      <input 
        type="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Qualification:</label>
      <input 
        type="role" 
        onChange={(e) => setRole(e.target.value)} 
        value={role} 
      />
      <label>Age:</label>
      <input 
        type="number" 
        onChange={(e) => setAge(e.target.value)} 
        value={age} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button > {loading ? "Loading..." : "Sign up"}</button>
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Applicantsignup