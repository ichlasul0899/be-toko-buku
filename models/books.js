const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

let bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images:[ImageSchema],
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

let book = mongoose.model("book", bookSchema);
module.exports = { book, bookSchema }