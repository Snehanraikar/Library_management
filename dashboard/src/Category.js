import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [catName, setCatName] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/categories', {
//         cat_name: catName,
//         sub_cat_name: subCatName
//       });
//       console.log(response.data);
//       // Display popup with success message
//       alert("Data added successfully");
//       // Redirect to collection page
//       setError(null);
//       navigate('/collection');
//     } catch (error) {
//       setError(error.message);
//     }
  };

  return (
    <div >
      <nav>
        <Link to="/dashboard" className="back-link"> Back</Link>
      </nav>
      <div className="ba">
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Category Name:
            <input type="text" value={catName} onChange={(event) => setCatName(event.target.value)} />
          </label>
          <br />
          <label>
            Sub Ctg  Name:
            <input type="text" value={subCatName} onChange={(event) => setSubCatName(event.target.value)} />
          </label>
          <br />
          <button type="submit" id="Add_cat" >Add Category</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Category;