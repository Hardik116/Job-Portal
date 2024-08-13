import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from '../redux/userslice';
import { logoutapplicant } from '../redux/applicantslice';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { applicant } = useSelector((state) => state.applicant);

  console.log('User:', user);
  console.log('Applicanttttt:', applicant);

  const handlehome = () => {
    if (user) {
      navigate('/home');
    } else if (applicant) {
      navigate('/applicanthome');
    } else {
      navigate('/log');
    }
  };

  const handleClick = async () => {
    try {
      if (user) {
        await dispatch(logoutuser());
      }
      if (applicant) {
        await dispatch(logoutapplicant());
      }
      navigate('/log');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header>
      <div className="container">
        <div style={{ cursor: 'pointer' }} onClick={handlehome}>
          <h1>Jobeasy</h1>
        </div>
        <nav>
          {user && (
            <div>
              <span style={{ marginRight: "20px" }}>{user.name}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {applicant && (
            <div>
              <span style={{ marginRight: "20px" }}>{applicant.name}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {(!user && !applicant) && (
            <div>
              <Link to="/log">Login</Link>
              <Link to="/sign">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
