const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Post route to add a person 
router.post('/', async(req, res)=>{
    try{
        const data = req.body //assuming the req.boy contains the person data
  
        //create a new person document using a mongoose module
        const newPerson = Person(data);
  
        // save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
      }
      catch (err){
        console.log(err);
        res.status(500).json({error : "Internal Sserver Error"});
      }
})
  
router.get('/', async(req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error : "Internal Sserver Error"});
    }
})

// we are building "parameterized call" for person in node js .In this ":workType" when we use ":" 
// then it changes to variable and thhen we can easily call what values are inside it
router.get('/:workType', async(req, res)=>{
    try{
      const workType = req.params.workType //Extract the work type from the URL parameter
      if (workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work : workType});
        console.log("Response Fetched")
        res.status(200).json(response);
      }else{
        res.status(404).json({error : 'Invalid work type'});
      }
    }catch (err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})

// Update
router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id; //extract the id from url parameter 
        const updatePersonData = req.body //update data for the person  
        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new : true, //return the updated document
            runValidators : true //run mongoose validation
        }) 

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log('data upated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})

// Delete
router.delete('/:id', async(req, res)=>{
    try{ 
        const personId = req.params.id; //extract the id from url parameter 
        //assuming you have a person model
        const response = await Person.findByIdAndRemove(personId);
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message : 'Ineenal Server Error'}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})
// Exporting the file
module.exports = router;