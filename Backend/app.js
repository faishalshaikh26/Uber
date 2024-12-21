const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./DB/db');
const userRoute = require('./routes/user.route');
const captainRoute = require('./routes/captain.routes.js');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users',userRoute);
app.use('/captains',captainRoute);

module.exports = app;