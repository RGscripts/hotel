const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async(req, res)=>{
    try{
      const MenuItemData = req.body //assumong that req.body conatins the menu details
  
      // Creating a new menu document using mongoose module
      const newMenu = MenuItem(MenuItemData)
  
      // Saving the menu to the database
      const menuData = await newMenu.save()
      console.log('Data saved')
      res.status(200).json(menuData);
  
    }catch (err){
      console.log(err);
      res.status(500).json({error : "Internal Sserver Error"});
    }
})
  
router.get('/', async(req, res)=>{
    try{
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error : "Internal Sserver Error"});
    }
})

// now we are going to build "parameterized call" for menu in nodejs. In this ":taste" when we use ":" 
// then it changes to variable and thhen we can easily call what values are inside it 
router.get('/:taste', async(req, res)=>{
  try{
    const taste = req.params.taste //Extract the taste from the URL parameter
    if (taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
      const response = await MenuItem.find({work : taste});
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

module.exports = router;