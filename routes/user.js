const express = require('express')
const router = express.Router()
const User = require('../models/user')



router.get('/', (req,res) => {
    res.render('users/index', { username:"Kate" })
})


router.get('/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/signup', (req,res) =>{
    
})

//login route
router.get('/login',(req,res) =>{
    res.render('users/login')
})


//signup route

//logout

module.exports = router;