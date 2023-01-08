//Schemas are basically created so that we can create and send DATA to the DATABASE(mongoose) : which defines the structure of the data that will be stored.


const mongoose = require('mongoose');
const user = require('./user');
 
const DataSchema = mongoose.Schema({                                  
    
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,                                   //used schema type to store userID       ***** this will get user from user.js and pass this value against the USER thruogh mongoose (this is basically to point this property to USER.JS)
        ref : user,                                         //pointing towards user.js
        required: true
    },
},{timestamps : true});                                        

module.exports = mongoose.model('Data', DataSchema); 