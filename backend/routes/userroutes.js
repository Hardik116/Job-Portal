const express = require("express");
const router = express.Router()
const {loginuser, signupuser,applyForJob, getAppliedJobs } = require('../controller/control')

router.post('/login',loginuser)

router.post('/signup',signupuser)

router.post('/apply',applyForJob)

router.get('/getappliedjobs' , getAppliedJobs)



module.exports = router;
   