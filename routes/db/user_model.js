const mongoose = require('mongoose');

const wishlistSchema = new moongoose.Schema({
    title : String,
    content : String,
    description : String,
    url : String

})

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true
    },
    wishlist : [wishlistSchema],
    country : String
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;