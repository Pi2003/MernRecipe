const connectToMongo = require('./db');
connectToMongo();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors=require('cors')
const express = require('express')
const app=express();
// const port= 4000


app.use(cors())
app.use(express.json())

//available routes
app.use('/mern/login',require('./routes/loginRoutes'))
app.use('/mern/recipe',require('./routes/recipeRoutes'))
app.use('/mern/ratings',require('./routes/ratingRoutes'))


app.listen(PORT,()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})