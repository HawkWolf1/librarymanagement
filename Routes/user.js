const express = require('express');

const router = express.Router();

const signUpController = require('../Controllers/signup')
router.post('/user/add-user',  signUpController.addUser)

const loginController = require('../Controllers/login')
router.post('/user/login', loginController.loginN)

const authController = require('../Middleware/auth')
const booksController = require('../Controllers/book')
router.post('/addBook', authController.authenticate, booksController.books)
router.get('/getBooks', booksController.showBooks)
router.get('/displayRentedBooks', booksController.rentedBooksList)


const rentController = require('../Controllers/rent')
router.post('/rentSelectedBooks', authController.authenticate, rentController.rentedBooks)
router.get('/getRentedBooks', authController.authenticate, rentController.fetchRentedBooks)

module.exports = router