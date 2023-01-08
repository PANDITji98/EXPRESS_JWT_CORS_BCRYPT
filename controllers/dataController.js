
const dataModel = require("../models/data")

const createData = async (req,res) => {
    //create data
    const {title , description} = req.body;
    
    //creating new data for data base
    const newData = new dataModel ({
       title : title,
       description : description,
       userId : req.userID
    })

 //saving the newData to the DATABASE
 try {

    await newData.save();
    res.status(201).json(newData)
    
 } catch (error) {
    
    console.log(error)
    res.status(500).json({Msg : 'An error occured'})
 }

}

const updateData = async (req,res) => {
    const id  = req.params.id;             //here through PARAMS  we are accessing the :id from the endpoint we have defined
    const {title , description} = req.body;

    const updatedData = {
        title : title,
        description : description,
        userId : req.userID
    }

    try {
        await dataModel.findByIdAndUpdate(id, updatedData, {new : true})              //new:true will first update the data in databse and return teh updated data
        res.status(200).json(dataModel)
    } catch (error) {
        console.log(error)
    res.status(500).json({Msg : 'An error occured'})
    }
}

const deleteData = async (req,res) => {
    const id = req.params.id;

    try {
        const deletedData = await dataModel.findByIdAndRemove(id)
        res.status(201).json(deletedData);
    } catch (error) {
        console.log(error)
    res.status(500).json({Msg : 'An error occured'})
    }
    
}
const getData = async (req,res) => {
    try {
        const Data = await dataModel.find({userID : req.userID})                    //finding the data by USERID in database
        res.status(200).json(Data)
    } catch (error) {
        console.log(error)
    res.status(500).json({Msg : 'An error occured'})
    }
}

module.exports = { createData , updateData , deleteData , getData}