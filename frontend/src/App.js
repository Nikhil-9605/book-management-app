import React, { useEffect, useState } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from './api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', publishedYear: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateBook(editId, form);
    } else {
      await addBook(form);
    }
    setForm({ title: '', author: '', publishedYear: '' });
    setEditId(null);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="App">
      <h1>📚 Book Management App</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Year" value={form.publishedYear} onChange={e => setForm({ ...form, publishedYear: e.target.value })} />
        <button type="submit">{editId ? 'Update' : 'Add'} Book</button>
      </form>

      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author} ({book.publishedYear})
            <button onClick={() => handleEdit(book)}>✏️ Edit</button>
            <button onClick={() => handleDelete(book._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
