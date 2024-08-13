import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getonejob, updatejob } from "../redux/jobslice"
import { useNavigate, useParams } from "react-router-dom"

const Updatejob = () => {
    const { user } = useSelector((state) => state.user)
    const { job, loading, error } = useSelector((state) => state.jobs) // Use 'job' instead of 'jobs'
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { jobId } = useParams()
    
    useEffect(() => {
        // Fetch the job details when the component mounts
        dispatch(getonejob(jobId))
    }, [dispatch, jobId]) // Dependencies array ensures this effect runs only once

    // Use job from Redux store
    const [location, setLocation] = useState(job?.location || '')
    const [salary, setSalary] = useState(job?.salary || '')
    const [description, setDescription] = useState(job?.description || '')
    const [title, setTitle] = useState(job?.title || '')

    useEffect(() => {
        // Update form state when job data changes
        if (job) {
            setLocation(job.location || '')
            setSalary(job.salary || '')
            setDescription(job.description || '')
            setTitle(job.title || '')
        }
    }, [job]) // Update state when job data changes

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user_id = user.id
        const company = user.name
        const salaryNumber = Number(salary)

        const jobcredential = { title, location, salary: salaryNumber, description, user_id, company }
        console.log(jobcredential)
        console.log(jobId)

        try {
            const resultAction = await dispatch(updatejob({jobcredential,jobId}))
            if (updatejob.fulfilled.match(resultAction)) {
                // Check if job posting was successful
                const { payload } = resultAction
                if (payload) {
                    setSalary('')
                    setLocation('')
                    setTitle('')
                    setDescription('')
                    navigate('/')
                }
                navigate('/getjob')
            } else {
                console.log('Job posting failed:', resultAction.payload)
            }
        } catch (error) {
            console.error('Posting error:', error)
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Update Job</h3>
            <label>Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
            />
            <label>Location:</label>
            <input 
                type="text" 
                onChange={(e) => setLocation(e.target.value)} 
                value={location} 
            />
            <label>Salary:</label>
            <input 
                type="number" 
                onChange={(e) => setSalary(e.target.value)} 
                value={salary} 
            />
            <label>Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="4" 
                cols="50" 
            />
            <button>{loading ? "Loading..." : "Update Job"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Updatejob
