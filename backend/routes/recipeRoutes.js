const express = require('express')
const router = express.Router();
const Recipe = require('../models/Recipe');
const { body, validationResult } = require('express-validator');


//Recipe
router.post('/getRecipes',async (req,res)=>{
    try{ 
        let response=await Recipe.find();
        return res.json({errors:false,'recipe':response})
    }catch(error){
        console.log(error.message);
        res.status(500).send({ errors: "Internal server error" });
    }
})

// add recipe
router.post('/addRecipe',async(req,res)=>{
    try{
        let resFind=await Recipe.findOne({name:req.body.name})
        if(resFind){
            return res.json({errors:true,'error':"Duplicate key error"})
        }
        else{
        let response = await Recipe.create({
            name:req.body.name,
            ingredients:req.body.ingredients,
            steps:req.body.steps,
            imageURL:req.body.imgUrl
        })
        return res.json({errors:false,'rating':response.name})
    }}catch(error){
        console.log(error.message)
        res.status(500).send({ errors: "Internal server error" });
    }
})

module.exports = router;