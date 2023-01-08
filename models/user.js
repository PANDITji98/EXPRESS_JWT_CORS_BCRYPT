//Schemas are basically created so that we can create and send DATA to the DATABASE(mongoose) : which defines the structure of the data that will be stored.

const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({                                  //this will store the values of the properties that are being passed like username, email and all   --- to save the sata on mongoDB
    
    username : {                                     //these are the values that will be stored in DATABASE
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
},{timestamps : true});                                        //tiemstamps will record the data and time whenever the properties and passed or changed by the user

module.exports = mongoose.model('user', UserSchema);           //now whenever we have to save the userdata we will use this