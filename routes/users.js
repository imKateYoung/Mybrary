const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const localUsers = []


//users page localhost:3000/users/
router.get('/', (req,res) => {
    res.render('users/index', { username:"Kate" })
})

//get signup form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

//login route
router.get('/login', (req, res) => {
    res.render('users/login')
})

//sign up form submit
router.post('/', express.urlencoded({ limit: '10mb', extended: false }) ,async (req,res) =>{
    console.log('first try')
    try{
        const hasedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hasedPassword)
        localUsers.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hasedPassword
        })
        console.log(localUsers)
        res.redirect('users/login')

    }
    catch{
        res.redirect('/users/signup')
        console.log('this is a catch block, meaning it failed to submit')
    }    
    console.log(users)
})





//signup route

//logout

module.exports = router;