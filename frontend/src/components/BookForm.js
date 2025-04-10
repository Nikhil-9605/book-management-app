import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, editingBook }) => {
  const [book, setBook] = useState({ title: '', author: '', genre: '', price: '' });

  useEffect(() => {
    if (editingBook) setBook(editingBook);
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ title: '', author: '', genre: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
      <input name="price" type="number" value={book.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
