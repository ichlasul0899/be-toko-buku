const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    gender:{
        type: String,
        required: true,
        enum:{
            values: ['man','woman'],
            message: '{VALUE} is not supported'
        }
    },
    birthdate:{
        type: Date,
        required: true,
    },
},{
    timestamps: true
})

let user = mongoose.model("user", userSchema);
module.exports = { user }