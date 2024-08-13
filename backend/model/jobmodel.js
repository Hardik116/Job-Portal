const mongoose = require('mongoose');

const jobschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

jobschema.statics.jobpost = async function({ title, location, salary, description, company,user_id }) {
    if (!title || !company || !description || !salary || !location || !user_id) {
        throw Error("All fields are required");
    }
    const job = await this.create({ title, location, salary, description, company,user_id});
    return job;
}

const Job = mongoose.model('Job', jobschema);
module.exports = Job;