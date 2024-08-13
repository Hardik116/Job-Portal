import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signupuser } from "../redux/userslice"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const{user,error,loading} = useSelector((state)=>state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const usercredential = { name, email, password };
        
        try {
          const resultAction = await dispatch(signupuser(usercredential));
          if (signupuser.fulfilled.match(resultAction)) {
            const { payload } = resultAction;
            if (payload) {  
              setName('')
              setEmail('');
              setPassword('');
              navigate('/home');
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
      <label>Organization Name:</label>
      <input 
        type="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
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

export default Signup