import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginuser } from "../redux/userslice"
import { useNavigate } from "react-router-dom"
// import uselogin from "../hooks/uselogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const{user,error,loading} = useSelector((state)=>state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const usercredential = { email, password };
        
        try {
          const resultAction = await dispatch(loginuser(usercredential));
          if (loginuser.fulfilled.match(resultAction)) {
            // Check if login was successful
            const { payload } = resultAction;
            if (payload) {  
              setEmail('');
              setPassword('');
              navigate('/home');
            }
          } else {
            console.log('Login failed:', resultAction.payload);
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Organization Log In</h3>
      
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

      <button > {loading ? "Loading..." : "Log in"}</button>
      {error && <div className="error">{error}</div>}

    </form>
  )
}

export default Login