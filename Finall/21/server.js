// Design a backend system to manage books in an online bookstore.
// Perform the following tasks using Node.js, Express.js, and MongoDB.
// The following operations should be performed in Node.js and Express.js only:
// • Add a new book (title, author, price, genre)
// • Retrieve a list of all books
// • Update book details
// • Delete a book from the collection
// C21 Design and develop Student Management System using Salesforce Cloud
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/book');  // Import the Book model

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Add static books (when server starts)
const addStaticBooks = async () => {
  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99, genre: 'Fiction' },
    { title: '1984', author: 'George Orwell', price: 8.99, genre: 'Dystopian' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 7.99, genre: 'Fiction' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 9.99, genre: 'Fiction' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', price: 6.99, genre: 'Romance' }
  ];

  // Insert books only if there are no books in the database
  const bookCount = await Book.countDocuments();
  if (bookCount === 0) {
    await Book.insertMany(books);
    console.log('5 static books added to the database');
  }
};

// Add static books when server starts
addStaticBooks();

// 1. Add a new book
app.post('/books', async (req, res) => {
  const { title, author, price, genre } = req.body;

  const newBook = new Book({ title, author, price, genre });
  
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Retrieve a list of all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Update a book's details
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, price, genre } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, price, genre },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
