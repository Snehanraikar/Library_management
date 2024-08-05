import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Member.css';
const Member = () => {
  const [memName, setMemName] = useState('');
  const [memPhone, setMemPhone] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/members', {
        mem_name: memName,
        mem_phone: memPhone,
        mem_email: memEmail
      });
      console.log(response.data);
      alert('Data added successfully'); // Display a popup with the success message
      // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
        <nav>
        <Link to="/dashboard" className="back-link"> Back</Link>
      </nav>
      <div class ="mem">
      <h1>Add Member</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Member Name:
          <input type="text" value={memName} onChange={(event) => setMemName(event.target.value)} />
        </label>
        <br />
        <label>
          Member Phone:
          <input type="text" value={memPhone} onChange={(event) => setMemPhone(event.target.value)} />
        </label>
        <br />
        <label>
          Member Email:
          <input type="email" id = "mail" value={memEmail} onChange={(event) => setMemEmail(event.target.value)} />
        </label>
        <br />
        <button type="submit" id='addmem'>Add Member</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default Member;