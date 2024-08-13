import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appliedjob, remove } from '../redux/jobslice';

function Appliedjobs() {
  const dispatch = useDispatch();
  const { applicant } = useSelector((state) => state.applicant);
  const { applied = [], loading, error } = useSelector((state) => state.jobs);
  const [appliedJobs, setAppliedJobs] = useState(new Set(applied.map(job => job._id)));

  useEffect(() => {
    if (applicant) {
      const usercredential = { userId: applicant.id };
      dispatch(appliedjob(usercredential));
    }
  }, [dispatch, applicant]);

  useEffect(() => {
    // Update appliedJobs state whenever applied changes
    setAppliedJobs(new Set(applied.map(job => job._id)));
  }, [applied]);

  const handleremove = async (jobId) => {
    const userId = applicant.id;
    const usercredential = { jobId, userId };

    try {
      const actionResult = await dispatch(remove(usercredential));
      if (remove.fulfilled.match(actionResult)) {
        console.log("Remove successful:", actionResult.payload);
        // Update the Set immediately after a successful remove
        setAppliedJobs(prev => {
          const updatedAppliedJobs = new Set(prev);
          updatedAppliedJobs.delete(jobId);
          return updatedAppliedJobs;
        });
      } else {
        console.error("Remove failed:", actionResult.error.message);
      }
    } catch (error) {
      console.error("An error occurred while removing:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Applied Jobs:</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {applied.length > 0 ? (
        <div className="row">
          {applied.filter(job => appliedJobs.has(job._id)).map((job) => (
            <div key={job._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text"><strong>Description:</strong> {job.description}</p>
                  <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                  <p className="card-text"><strong>Location:</strong> {job.location}</p>
                  <button onClick={() => handleremove(job._id)}>Remove</button>
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

export default Appliedjobs;
