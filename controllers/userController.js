//controllers are created so that the functions that route file have (user or notes or any etc...) can be directed from here only instead of writting them in route file itself

const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req,res) => {                       //to register the user - following steps will be taken [1,2,3 and 4]
    const { username, email, password } = req.body;              //these are the credentials that user will enter and hence REQ is used as it will be a request from user's side
    
    try {
        if(!username || !password || !email) {                                      //this is to check whether user has passed all the details as required or not
            return res.status(500).json({Msg:"Please enter the full details"});      
        }
    
        //[1]checking in the Database whether user EXISTS or not!                      //[ALSO, WE WILL USE async await TO AWAIT FOR THE FUNCTION TO COMPLETE AND THEN ONLY MOVE FORWARD!!!!]
        const existingUser = await userModel.findOne({email : email});             //this is checking in database for the user by EMAIL using FINDONE method that is connected to the schema of user (userModel)
        if(existingUser){
            return res.status(400).json({Msg: "User already exists with this email ID"});          
        }
        
        //[2]Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);                    //HASHED the password that is passed by the user in the signup process; the number is SALT ROUNDS for encryption
    
        //[3]Creating the user
        const result = await userModel.create({                                   //Created a user in the DATABASE
            username : username,
            email : email,
            password : hashedPassword                                             //while creating the user in the database, we have stored the encrypted password which we have created above
        }); 
    
        //!!as result is created (user in database), mongoose has generated a unique ID for the user apart from just {username,password,email}
      
        //[4]Generating the TOKENS
        const token = jwt.sign({email: result.email, id : result._id}, SECRET_KEY);       //here 2 things are passed     1) the PAYLOAD in which user's email and the ID (_id - from mongoose) is passsed       2) the secret key that the token will contain which should be a secured key!
        res.status(201).json({user : result, token : token});                            // passed 2 things  1)the whole result object(user)   2)the TOEKN that we have generated
        
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //THIS IS THE VALUE WE GET AFTER WE PASS URL TO POSTMAN
        // {
        //     "user": {
        //         "username": "Anshul-test",
        //         "email": "tset@email.com",
        //         "password": "$2b$10$go7NAIFy/uRrFymQD4AH8eJLkS3eLr1DZzhwOkZo73KLs7gMbPdke",
        //         "_id": "63b9564e7d7ce378eea253ab",
        //         "createdAt": "2023-01-07T11:23:58.621Z",
        //         "updatedAt": "2023-01-07T11:23:58.621Z",
        //         "__v": 0
        //     },
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRzZXRAZW1haWwuY29tIiwiaWQiOiI2M2I5NTY0ZTdkN2NlMzc4ZWVhMjUzYWIiLCJpYXQiOjE2NzMwOTA2Mzh9.-RgXkc0e4sPPlLh-5ytZY1xDvsXKIYsYqXm5W7qaICc"
        // }
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //user can now use the token

    } catch (error) {
        console.log(error);
        res.status(500).json({Msg: "Something went wrong"});
    }

}

const signin = async (req,res) => {

    const {email , password} = req.body;
     try {
         //Check whether user is SIGNedUP or not! - check in Database
         const existingUserInDB = await userModel.findOne({email : email});
         if(!existingUserInDB){
            return res.status(404).json({Mag: "User does not exist; Please signup first"});
         }
     
         //Match the password that is entered by the user and the password we have in the database
         const matchPassword  = await bcrypt.compare(password, existingUserInDB.password);

         //if password does not match pass the bad res and error msg
         if(!matchPassword){
            return res.status(400).json({Msg: "Invalid password"})
         }

         //Generate the token in teh similar way above if everything goes well from the user's side
         const token = jwt.sign({email : existingUserInDB.email, id : existingUserInDB._id }, SECRET_KEY)
         res.status(200).json({user: existingUserInDB, token : token})

     } catch (error) {
        console.log(error);
        res.status(500).json({Msg: "Something went wrong"});
     }
}

module.exports = {signin , signup}; 