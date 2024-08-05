import React, { useState } from 'react';
import axios from 'axios';
import './AddIssuance.css';
import { Link } from 'react-router-dom';

const AddIssuance = () => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [targetReturnDate, setTargetReturnDate] = useState('');
  const [issuanceStatus, setIssuanceStatus] = useState('');
  const [message, setMessage] = useState('');
  const [books, setBooks] = useState([]); // Add a state to store the list of books

  // Fetch the list of books when the component mounts
  React.useEffect(() => {
    axios.get('http://localhost:3000/books')
     .then(response => {
        setBooks(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!bookId || !memberId || !issuedBy || !targetReturnDate || !issuanceStatus) {
      setMessage('Please fill in all fields');
      return;
    }
  
    const issuanceDate = new Date().toISOString(); // Get the current date and time in ISO format
  
    try {
      const response = await axios.post('http://localhost:3000/issuances', {
        book_id: parseInt(bookId),
        issuance_date: issuanceDate,
        issuance_member: parseInt(memberId),
        issued_by: issuedBy,
        target_return_date: targetReturnDate,
        issuance_status: issuanceStatus
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
       <nav>
        <Link to="/dashboard" className="back-link"> Back</Link>
      </nav>
      <div className = "addiss">
      <h1>Add Issuance</h1>
      <form onSubmit={handleSubmit}>
        <label>
          BookID:
          <select value={bookId} onChange={(event) => setBookId(event.target.value)} required>
  {books.map(book => (
    <option key={book.book_id} value={book.book_id}>{book.book_id}</option>
  ))}
</select>
        </label>
        <br />
        <label>
          MemID:
          <input type="number" value={memberId} onChange={(event) => setMemberId(event.target.value)} required />
        </label>
        <br />
        <label>
          IssueBy:
          <input type="text" id ="in" value={issuedBy} onChange={(event) => setIssuedBy(event.target.value)} required />
        </label>
        <br />
        <label>
          Rtndate:
          <input type="datetime-local" value={targetReturnDate} onChange={(event) => setTargetReturnDate(event.target.value)} required />
        </label>
        <br />
        <label>
          Issue St:
          <input type="text" id ="in" value={issuanceStatus} onChange={(event) => setIssuanceStatus(event.target.value)} required />
        </label>
        <br />
        <button type="submit" id = "AddIss">Add Issuance</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
    </div>
  );
};

export default AddIssuance;