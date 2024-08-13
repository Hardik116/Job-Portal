import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getjob } from '../redux/jobslice';
import { deletejob } from '../redux/jobslice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Getjob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { jobs = [], loading, error } = useSelector((state) => state.jobs); 

    const handleDelete = (jobId) => {
        console.log("Job ID to delete:", jobId);
        dispatch(deletejob(jobId));
    }

    const handleupdate = (jobId) => {
        navigate(`/updatejob/${jobId}`);
    }
    const handleview = (jobId) =>{
        navigate(`/viewapplicant/${jobId}`);
    }
    

    useEffect(() => {
        if (user && user.id) {
            const user_id = user.id;
            console.log('Dispatching getjob with user_id:', user_id);
            dispatch(getjob(user_id));
        }
    }, [dispatch, user]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Posted Jobs</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {jobs.length > 0 ? (
                <div className="row">
                    {jobs.map((job) => (
                        <div key={job._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                                    <p className="card-text"><strong>Description:</strong> {job.description}</p>
                                    <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                                    <p className="card-text"><strong>Location:</strong> {job.location}</p>
                                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                                    <button onClick={() => handleupdate(job._id)}>Update</button>
                                    <button onClick={() => handleview(job._id)}>View applicant</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No jobs available.</p>
            )}
        </div>
    );
};

export default Getjob;
