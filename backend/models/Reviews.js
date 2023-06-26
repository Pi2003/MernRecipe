const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    }
});

const rating = mongoose.model('rating', ratingSchema);
rating.createIndexes();
module.exports = rating;