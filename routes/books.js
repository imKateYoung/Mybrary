//handle request flow, never handled data logic

const express = require('express')
const router = express.Router()
const Book = require('../models/book') //handling data
const Author = require('../models/author')  //pass it down to view

//get all book route
router.get('/', async (req, res) => {
   res.send('all books')
})

//new book router
router.get('/new', async (req,res) =>{
    try {
        const authors = await Author.find({});
        const book = new Book();
        res.render('books/new', {
            authors: authors,
            book: book
        })
    }
    catch {
        res.send('error')
    }
    res.render('books/new')
})


//create new book
router.post('/', express.urlencoded({ limit: '10mb', extended: false }), async (req, res) => {
   res.send('create book')
})

module.exports = router;
