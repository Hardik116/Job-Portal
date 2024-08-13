import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getapplications, remove } from '../redux/jobslice';
import { useParams } from 'react-router-dom';
import { appliedjob} from '../redux/jobslice';


function Viewapplicant() {
  const dispatch = useDispatch();
  const { applicant } = useSelector((state) => state.applicant);
  const { applied = [], loading, error } = useSelector((state) => state.jobs);
  const [appliedJobs, setAppliedJobs] = useState(new Set(applied.map(job => job._id)));
  const { jobId } = useParams()

  useEffect(() => {
      const usercredential = { jobId: jobId };
      dispatch(getapplications(usercredential));
    
  }, [dispatch, applicant]);


  const handleDelete = async(user_Id) =>{
    const userId = user_Id;
    // const jobId = jobId;
    const usercredential = {userId,jobId};
    console.log(userId);
    console.log(jobId);
    
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
  }
  return (
    <div className="container mt-4">
            <h1 className="mb-4">Applicants who applied </h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {applied.length > 0 ? (
                <div className="row">
                    {applied.map((job) => (
                        <div key={job._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{job.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{job.role}</h6>
                                    <p className="card-text"><strong>Email:</strong> {job.email}</p>
                                    <p className="card-text"><strong>Age:</strong> {job.age}</p>
                                    <button onClick={() => handleDelete(job._id)}>decline</button>
                                    <button onClick={() => handleshortlist(job._id)}>shortlist</button>
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

export default Viewapplicant;