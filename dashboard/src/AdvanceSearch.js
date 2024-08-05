import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdvanceSearch.css';
import { Link } from 'react-router-dom';
function AdvancedSearch() {
  const [neverBorrowedBooks, setNeverBorrowedBooks] = useState([]);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books/never-borrowed')
    .then(response => {
        setNeverBorrowedBooks(response.data);
      })
    .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:3000/books/most-borrowed')
    .then(response => {
        setMostBorrowedBooks(response.data);
      })
    .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
       <nav>
        <Link to="/dashboard" className="back-link"> Back</Link>
      </nav>
      <div class ='AdSe'>
      <h1>Advanced Search</h1>
      <section>
        <h2>Books that have never been borrowed</h2>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Book Category ID</th>
              <th>Book Collection ID</th>
              <th>Book Launch Date</th>
              <th>Book Publisher</th>
            </tr>
          </thead>
          <tbody>
            {neverBorrowedBooks.map(book => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.book_name}</td>
                <td>{book.book_cat_id}</td>
                <td>{book.book_collection_id}</td>
                <td>{book.book_launch_date}</td>
                <td>{book.book_publisher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
  <h2>Top 10 most borrowed books</h2>
  <table>
    <thead>
      <tr>
        <th>Book Name</th>
        <th># of times borrowed</th>
        <th># of Members that borrowed</th>
      </tr>
    </thead>
    <tbody>
      {mostBorrowedBooks.map(book => (
        <tr key={book.bookName}>
          <td>{book.bookName}</td>
          <td>{book.numBorrowed}</td>
          <td>{book.numMembers}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>
    </div>
    </div>
  );
}

export default AdvancedSearch;