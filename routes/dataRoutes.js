const express = require('express');
const { getData, createData, deleteData, updateData } = require('../controllers/dataController');
const auth = require('../middleware/auth');
const dataRouter = express.Router();
//putting AUTH so that the endpoints that are for get, update, post and delete will be secured and authorized through the middleware (WE ALSO HAVE THE userID from AUTH)

dataRouter.get('/', auth, getData);      

dataRouter.post('/', auth, createData);     //when we call this function, we will passs the token and postman will identify the USERID ad store the data in DB against the USERID


//putting :id so that perticular data can be targetted and deleted or updated
dataRouter.delete('/:id', auth, deleteData);

dataRouter.put('/:id', auth, updateData);


module.exports = dataRouter;