const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userroutes = require('./routes/userroutes');
const companyroute = require('./routes/companyroute')
const jobroute = require('./routes/jobroute')

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/users', userroutes);
app.use('/api/company', companyroute);
app.use('/api/jobs', jobroute);


mongoose.connect(process.env.DBURI)
    .then(() => {
        console.log("connected to DB");
        app.listen(process.env.PORT, () => {
            console.log("Listening on port: " + process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
