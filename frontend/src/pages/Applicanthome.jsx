import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getalljob, apply, appliedjob } from '../redux/jobslice';
import { useNavigate } from 'react-router-dom';

function Applicanthome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicant } = useSelector((state) => state.applicant);
  const { jobs = [], applied = [], loading, error } = useSelector((state) => state.jobs);
  
  // Initialize local state with the applied jobs from Redux
  const [appliedJobs, setAppliedJobs] = useState(new Set(applied.map(job => job._id)));

  useEffect(() => {
    if (applicant) {
      dispatch(getalljob());
      const usercredential = {
        userId: applicant.id
      };
      dispatch(appliedjob(usercredential));
    }
  }, [dispatch, applicant]);

  useEffect(() => {
    // Update local state when the applied jobs from Redux change
    setAppliedJobs(new Set(applied.map(job => job._id)));
  }, [applied]);

  const handleapply = async (jobId) => {
    const userId = applicant.id;
    const usercredential = { jobId, userId };

    try {
      const actionResult = await dispatch(apply(usercredential));
      if (apply.fulfilled.match(actionResult)) {
        console.log("Apply successful:", actionResult.payload);
        setAppliedJobs(prev => new Set(prev.add(jobId)));
      } else {
        console.error("Apply failed:", actionResult.error.message);
      }
    } catch (error) {
      console.error("An error occurred while applying:", error.message);
    }
  };

  const handleview = () => {
    navigate('/appliedjobs');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Recent job openings:</h1>
      <button onClick={handleview}>View applications</button>
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
                  <button
                    onClick={() => handleapply(job._id)}
                    disabled={appliedJobs.has(job._id)} // Disable button if job ID is in appliedJobs
                  >
                    {appliedJobs.has(job._id) ? 'Applied' : 'Apply'}
                  </button>
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
}

export default Applicanthome;
