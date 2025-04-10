const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');


// Get all books
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add new book
router.post('/', async (req, res) => {
    const { title, author, genre, price } = req.body;
    const newBook = new Book({ title, author, genre, price });
    await newBook.save();
    res.json(newBook);
});

// Update book
router.put('/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
});

// Delete book
router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
});

module.exports = router;
