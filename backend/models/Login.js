const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique:true
    },
    pass: {
        type: String,
        required: true
    },
});

const user = mongoose.model('user', userSchema);
user.createIndexes();
module.exports = user;