//store user

const mongoose = require('mongoose')
const { schema } = require('./book')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userpassword:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

//brycpt



module.exports = mongoose.model('User',userSchema)