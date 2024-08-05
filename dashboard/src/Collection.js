import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Collection.css';
import { useNavigate } from 'react-router-dom';


const Collection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/collections', {
        collection_name: collectionName
      });
      console.log(response.data);
      // Redirect to dashboard
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
         <nav>
        <Link to="/dashboard" className="back-link"> Back</Link>
      </nav>
      <div className="bu">
      <h1>Add Collection</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Collection Name:
          <input type="text" value={collectionName} onChange={(event) => setCollectionName(event.target.value)} />
        </label>
        <br />
        <button type="submit" id ="addcol">Add Collection</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default Collection;