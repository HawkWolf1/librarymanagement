const rentedBooksTable = require("../Models/rentedBooksTable");

const rentedBooks = async (req, res, next) => {
    try {
        const books = req.body;

        if (books && Array.isArray(books) && books.length > 0) {
            const userId = req.user.id;
            const userName = req.user.name
            for (const book of books) {
                await rentedBooksTable.create({
                    bookName: book.bookName,
                    quantity: book.quantity,
                    userId: userId,
                    personRented: userName
                });
            }

            res.status(200).json({ message: 'Books rented successfully!' });
        } else {
            res.status(400).json({ message: 'Invalid request. Please provide an array of books with names and quantities.' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const fetchRentedBooks = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const rentedBooks = await rentedBooksTable.findAll({
            where: {
                userId,
            },
            attributes: ['bookName', 'quantity', 'rentedDate'],
        });

        res.status(200).json(rentedBooks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports={
    rentedBooks,
    fetchRentedBooks
    }