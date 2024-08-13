import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Navbar from './component/Navbar';

import Home from './pages/Home';
import Addjob from './pages/Addjob';
import Getjob from './pages/Getjob';
import Updatejob from './pages/Updatejob';

import Log from './pages/Log';
import Sign from './pages/Sign';
import Applicanthome from './pages/Applicanthome';
import Applicantlogin from './component/Applicantlogin';
import Applicantsignup from './component/Applicantsignup';
import Viewapplicant from './pages/Viewapplicant';

import Appliedjobs from './pages/Appliedjobs';

import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.user);
  const { applicant } = useSelector((state) => state.applicant);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="Page">
          <Routes>
            <Route path="/addjob" element={<Addjob />} />
            <Route path="/getjob" element={<Getjob />} />
            <Route path="/log" element={<Log />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/viewapplicant/:jobId" element={<Viewapplicant />} />
            <Route path="/appliedjobs" element={<Appliedjobs />} />
            <Route path="/applicantlogin" element={<Applicantlogin />} />
            <Route path="/applicantsignup" element={<Applicantsignup />} />
            <Route path="/updatejob/:jobId" element={<Updatejob />} />
            <Route path="/applicanthome" element={applicant ? <Applicanthome /> : <Navigate to="/log" />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/log" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
