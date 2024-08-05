import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [targetReturnDate, setTargetReturnDate] = useState('');
  const [status, setStatus] = useState('');
  const [issuances, setIssuances] = useState([]);
  const [books, setBooks] = useState([]);

  const handleTargetReturnDateChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      setTargetReturnDate(inputValue);
    } else {
      alert('Invalid date format. Please enter in the format: yyyy-mm-ddThh:mm:ss.sssZ');
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!targetReturnDate || !status) {
      alert('Please fill in both target return date and status');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3000/api/issuances');
      const allIssuances = response.data;
      const filteredIssuances = allIssuances.filter((issuance) => {
        return issuance.target_return_date === targetReturnDate && issuance.issuance_status === status;
      });
      setIssuances(filteredIssuances);
    } catch (error) {
      console.error(error);
      alert('An error occurred while retrieving the issuances. Please try again later.');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/issuances')
     .then(response => {
        setIssuances(response.data);
      })
     .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:3000/books')
     .then(response => {
        setBooks(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="dashboard-container">
 <nav class="navbar">
  <div class="navbar-brand">Library Management System</div>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="/book">Add Books</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/member">Add Members</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/issuance">Add Issuance</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/advance-search">Advance Search</a>
    </li>
  </ul>
</nav>
<div class = "mainpart">
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Target Return Date:
          <input type="text" value={targetReturnDate} onChange={handleTargetReturnDateChange} placeholder="yyyy-mm-ddThh:mm:ss.sssZ" required />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={handleStatusChange} required>
            <option value="">Select Status</option>
            <option value="borrowed">borrowed</option>
            <option value="returned">returned</option>
          </select>
        </label>
        <br />
        <button type="submit" >Submit</button>
      </form>
      {issuances.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Issuance ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Issuance Date</th>
              <th>Issued By</th>
              <th>Target Return Date</th>
              <th>Issuance Status</th>
            </tr>
          </thead>
          <tbody>
            {issuances.map((issuance) => {
              const book = books.find((book) => book.book_id === issuance.book_id);
              return (
                <tr key={issuance.issuance_id}>
                <td>{issuance.issuance_id}</td>
                <td>{book? book.book_name : 'Unknown'}</td>
                <td>{book? book.book_publisher: 'Unknown'}</td>
                <td>{issuance.issuance_date}</td>
                <td>{issuance.issued_by}</td>
                <td>{issuance.target_return_date}</td>
                <td>{issuance.issuance_status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
  </div>
);
};

export default Dashboard;