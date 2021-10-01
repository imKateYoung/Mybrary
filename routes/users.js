const express = require('express')
const router = express.Router()
const User = require('../models/user') //for db
const bcrypt = require('bcrypt')

const initializePassport = require('../passport-config')
const passport = require('passport')
initializePassport(passport, email =>{
    return user.find(user => user.email === email)
})

//users page localhost/users/
router.get('/', (req,res) => {
    res.render('users/index', { username:"Jane" })
})

//login route
router.get('/login', (req, res) => {
    res.render('users/login')
})

//get signup form
router.get('/signup', function(req, res) {
    res.render('users/signup')
   //console.log(res)
   console.log(req.body)
})


//sign up form submit
router.post('/', express.urlencoded({ extended: false }), async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.userpassword,10)
     const user = new User({
         username: req.body.username,
         email: req.body.email,
         userpassword: hashedPassword
     })
     
     try{
         const newUser = await user.save()
         console.log('succesfully created new user!')
         console.log(newUser)
         return res.redirect(307,"/login")
     }
     catch(err){
         console.log(err)
         return res.redirect('/signup')
     }
})








//logout

module.exports = router;