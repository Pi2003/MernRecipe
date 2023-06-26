const mongoose = require('mongoose');
require("dotenv").config();

const mongoUri=process.env.MONGODB_URI;
const connectToMongo =async () =>{
    await mongoose.connect(
        mongoUri,
        {
        dbName: 'mernProj',
        useNewUrlParser: true,
        useUnifiedTopology: true
        }
        );
}

module.exports = connectToMongo;