const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req,res,next)=>{

    try {
        //Get the token from headers.authorization that we will get from req
        let token = req.headers.authorization;
        if(token){
            //split the token into "bearer ...token"
            token = token.split(" ")[1];                     //[1] stands for the token itself that is fetched by req
            
            //verify the token
            let user = jwt.verify(token, SECRET_KEY)

            //get access to the user ID that was passed in the TOKEN
            req.userID = user.id;

        } else {
            
           return res.status(401).json({Msg: "Unauthorized User - Invalid token"})
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({Msg: "Unauthorized User - Invalid token"})
    }
}


module.exports = auth;