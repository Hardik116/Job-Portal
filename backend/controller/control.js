const mongoose = require("mongoose");
const User = require('../model/usermodel')
const Company = require('../model/companymodel')
const Job = require('../model/jobmodel');


const loginuser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.login(email, password);
        // Send response only once        
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Send response only once
        res.status(400).json({ error: error.message });
    }
}

const signupuser = async (req, res) => {
    const { name, email, password,role,age } = req.body;
    try {
        const user = await User.signup(name, email, password,role,age);
        // Send response only once
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Send response only once
        res.status(400).json({ error: error.message });
    }
}

const logincompany = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await Company.login(email, password);
        // Send response only once        
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Send response only once
        res.status(400).json({ error: error.message });
    }
}
const signupcompany = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Company.signup(name, email, password);
        // Send response only once
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Send response only once
        res.status(400).json({ error: error.message });
    }
}


//job controls 
const getalljob = async (req, res) => {
    console.log("Request received at /api/jobs/getalljob");
    const { user_id } = req.query;
    
    if (!user_id) {
        console.log("User ID is missing in query");
        return res.status(400).json({ message: 'User ID is required' });
    }
    
    try {
        const jobs = await Job.find({ user_id }).sort({ createdAt: -1 });
        console.log(`Found ${jobs.length} jobs for user ID ${user_id}`);
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        res.status(500).json({ message: error.message });
    }
};


const getallorgjob = async (req, res) => {
    console.log(req.query);
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    
const deletejob=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({error:"not a valid id"})
    }
    const job = await Job.findByIdAndDelete(id)
    if(!job){
        res.status(404).json({error: "cannot find the job"})
    }
    res.status(200).json(job);
}

const updatejob = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid job ID" });
    }
    try {
        const job = await Job.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getonejob=async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid job ID" });
    }
    try {
        const job = await Job.findById(id);
        if(!job){
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



const job = async (req, res) => {
    const { title, location, salary, description, company,user_id } = req.body;
    try {
        const newJob = await Job.jobpost({ title, location, salary, description, company,user_id});
        res.status(200).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const applyForJob = async (req, res) => {
    const { jobId,userId } = req.body;
    try {
        const job = await Job.findById(jobId);
        if (job.applications.includes(userId)) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }
        await User.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } });
        await Job.findByIdAndUpdate(jobId, { $push: { applications: userId } });
        res.status(200).json({ message: 'Applied for job successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const remove = async (req, res) => {
    const { jobId,userId } = req.body;
    try {
        const job = await Job.findById(jobId);
        if (job.applications.includes(userId)) {
            await User.findByIdAndUpdate(userId, { $pull: { appliedJobs: jobId } });
            await Job.findByIdAndUpdate(jobId, { $pull: { applications: userId } });
        }else{
            return res.status(400).json({ message: 'You have not applied for this job' });
        }
        res.status(200).json({ message: 'removed application successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getAppliedJobs = async (req, res) => {
    const userId = req.query.userId;
    console.log('User ID:', userId);
    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findById(userId).populate('appliedJobs');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.appliedJobs);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const getapplications = async (req, res) => {
    const jobId = req.query.jobId;
    console.log('Job ID:', jobId);
    try {
        if (!jobId) {
            return res.status(400).json({ message: 'job ID is required' });
        }
        const user = await Job.findById(jobId).populate('applications');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.applications);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};


module.exports={
    loginuser,
    signupuser,
    logincompany,
    signupcompany,
    job,
    getalljob,
    deletejob,
    updatejob,
    getonejob,
    getallorgjob,
    applyForJob,
    getAppliedJobs,
    remove,
    getapplications,
}