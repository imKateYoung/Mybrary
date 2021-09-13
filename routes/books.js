//handle request flow, never handled data logic

const express = require('express')
const router = express.Router()
const Book = require('../models/book') //handling data
const Author = require('../models/author')  //pass it down to view
const path = require('path')
const uploadPath = path.join('public',Book.coverImageBasePath)
const fs = require('fs')
const multer = require('multer')
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter:(req,file,callback) =>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})

//get all book route
router.get('/', async (req, res) => {

    let query = Book.find()
    if(req.query.title != null && req.query.title != ''){
        query = query.regex('title',new RegExp(req.query.title,'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore )
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }

    try{
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    }
    catch{
        redirect('/')
    }
})

//new book router
router.get('/new', async (req,res) =>{
    renderNewPage(res,new Book())
})


//create new book
router.post('/', express.urlencoded({ limit: '10mb', extended: false }), upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
   const book = new Book({
       title: req.body.title,
       author: req.body.author,
       publishDate: new Date(req.body.publishDate),
       pageCount: parseInt(req.body.pageCount),
       coverImageName : fileName,
       desc: req.body.desc
   })
   try{
    const newBook = await book.save()
    res.redirect('books')
   }
   catch{
    renderNewPage(res,book,true)
   }

})

async function renderNewPage(res,book,hasError = false){
    try {
        const authors = await Author.find({});
       const params = {
           authors: authors,
           book: book
       }
       if (hasError) {
           params.errorMessage = 'Error creating book'
       }
        res.render('books/new',params)
      
    }
    catch {
        res.send(res.redirect('/books'))
    }
    //res.render('books/new')
}

module.exports = router;
