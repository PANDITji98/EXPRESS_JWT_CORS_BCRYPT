const express = require('express');
const app = express();                                                                      //created a backend app
const mongoose = require('mongoose');                                                       //imported MONGODB
const data = require('./routes/dataRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require("cors")

const dotenv  = require('dotenv')                            //for .env file               //we defile .env according to developement and production basis like databse or port
dotenv.config();                                             //calling the method

// const leadForm = require('./lead-form-960cb-default-rtdb-export.json')

//nodemon prevents serve to restart again and again when we make changes in the code

app.use(express.json());          //this will PARSE the REQ.BODY into a json            //this function should be passed at first !!!!!!******* VERY IMPORTANT
//We create routes and put them in main file (index.js) so that writting all the endpoints in file (index.js) can be prevented****

app.use(cors());           //this will add headers so that we can API from anywhere

app.use('/users', userRouter);                                            //imported the userRouter in which the USERS endpoint will have 2 other endpoints that are SINGUP and SIGNIN
app.use('/data', data); 



app.get('/', (req,res)=>{
    res.send("Home Page")
})

PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)                       //connecting mongoose through the database link we created on mongodb website (THRUOGH .ENV FILE)
.then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server started at port: ${PORT}`) 
    })                                                                        //did a callback and asked to listen on port 5000  
})                                              //this will call the function as soon as we are connected to the link       ||  *******also, it will start the APP whenever we are connected to the database******
.catch((error)=> {
    console.log(error);
})                                             //this will simply catch the error






//----------------**********FOR EXAMPLE PRACTICE ONLY************---------------------------------------------------------------------------------------------//
// app.get('/', (req,res) => {
//     res.send('Hello it is my res')                                       //send respond using res.send method
// })

// app.get('/leadform', (req,res) => {
//     res.status(200).json(leadForm)                                       //to pass the json data || also send status code 200               
// })

// app.get('/random', (req,res) => {
//     let index = Math.floor(Math.random() * leadForm.length)
//     let randomdata = leadForm[index]
//     res.status(200).json(randomdata)
// })


