const express = require("express");
const router = express.Router()
const {logincompany, signupcompany, getapplications} = require('../controller/control')


router.post('/signupcomp',signupcompany)
router.post('/logincomp',logincompany)
router.get('/getapplications',getapplications);


module.exports = router;
