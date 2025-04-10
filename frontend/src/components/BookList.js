import React from 'react';

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div>
      <h3>Book List</h3>
      {books.map((book) => (
        <div key={book._id}>
          <h4>{book.title}</h4>
          <p>Author: {book.author} | Genre: {book.genre} | Price: ₹{book.price}</p>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
