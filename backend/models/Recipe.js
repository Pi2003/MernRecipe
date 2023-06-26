const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    imageURL: {
        type: String,
        required: true
    },
    originalURL: {
        type: String,
        required:false
    },
    ingredients:{
        type:Array,
        required:true
    },
    steps:{
        type:Array,
        required:true
    },
    timers:{
        type:Array,
        required:false
    }
});

const recipe = mongoose.model('recipe', recipeSchema);
recipe.createIndexes();
module.exports = recipe;