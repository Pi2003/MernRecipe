const express = require('express')
const router = express.Router();
const Reviews = require('../models/Reviews');
const { body, validationResult } = require('express-validator');


//get ratings by recipe
router.post('/getRatings',async (req,res)=>{
    try{ 
        let response=await Reviews.find(
            {   
                name:req.body.name,
            });
        return res.json({errors:false,'ratings':response})
    }catch(error){
        console.log(error.message);
        res.status(500).send({ errors: "Internal server error" });
    }
})



//update ratings
router.post('/updateRatings',async (req,res)=>{
    try{ 
        let response=await Reviews.findOne(
            {   
                name:req.body.name,
                user:req.body.user,
            });
        if(response){
            //update
            let responseUpdate=await Reviews.updateOne(
                {   
                    name:req.body.name,
                    user:req.body.user
                },{rating:req.body.rating});
            return res.json({errors:false})
        }
        else{
            //create
            let responseCreate=await Reviews.create({
                name:req.body.name,
                user:req.body.user,
                rating:req.body.rating
            })
            return res.json({errors:false,'rating':responseCreate.rating})
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send({ errors: "Internal server error" });
    }
})


module.exports = router;