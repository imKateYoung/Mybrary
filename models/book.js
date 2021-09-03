//handles data logic, interacting with database

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required:true
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now
    },
    coverImg:{
        type: String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Author'
    }

})

module.exports = mongoose.model('Book',bookSchema)
