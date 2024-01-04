const bookTable = require("../Models/bookTable")
const rentedBooksTable = require("../Models/rentedBooksTable");

const books = async(req, res, next) => {
    try{
    const {bookName, author} = req.body
    const userId = req.user.id
    await bookTable.create({ 
    bookName,
    author,
    userId

    })
    res.status(201).json({ message: 'New Book added successfully!' }) 

    }catch(err){
    res.status(500).json(err)
    
    }
    }


const showBooks = async(req,res,next)=>{
    try{
        const books = await bookTable.findAll();
        res.status(200).json(books);
    }catch{
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
  
    }
}


const rentedBooksList = async(req,res,next)=>{
    try {
        const rentedBooksInfo = await rentedBooksTable.findAll();
        res.status(200).json(rentedBooksInfo);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

module.exports={
    books,
    showBooks,
    rentedBooksList
}