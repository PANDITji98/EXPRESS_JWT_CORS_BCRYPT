const express = require('express');
const { signup, signin } = require('../controllers/userController');                    //calling both functions from the userController file 
const userRouter = express.Router();                       //to get the ROUTER


userRouter.post('/signup' , signup);              //putting the fucntions from controller file 

userRouter.post('/signin' , signin);    


//exporting the router so that we can use it in another component
module.exports = userRouter;



//sign up router eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWQiOiI2M2JhY2ZjZTk2MWIyNTBlNzAwYmJhYTAiLCJpYXQiOjE2NzMxODcyNzh9.lbiyxNYOJ3phdQXWG_842_QHv-lp4ounnoQKsgUlFm0
//user id 63bad66ec14bc438115e0d2a