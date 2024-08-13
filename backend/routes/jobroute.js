const express = require("express");
const router = express.Router()
const { job, getalljob, deletejob, updatejob, getonejob, getallorgjob, remove, getapplications} = require('../controller/control')


router.post('/postjob',job);

router.get('/getjob',getalljob);

router.get('/getalljob',getallorgjob);

router.delete('/:id', deletejob);

router.patch('/:id' , updatejob);

router.get('/:id',getonejob);

router.post('/remove',remove);




module.exports = router;
   