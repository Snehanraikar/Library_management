import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './Book.css';

const Book = () => {
  const [bookName, setBookName] = useState('');
  const [bookCatId, setBookCatId] = useState('');
  const [bookCollectionId, setBookCollectionId] = useState('');
  const [bookLaunchDate, setBookLaunchDate] = useState('');
  const [bookPublisher, setBookPublisher] = useState('');
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/collections')
     .then(response => {
        const collectionsData = response.data[0];
        setCollections(collectionsData);
      })
     .catch(error => {
        setError(error.message);
      });

    axios.get('http://localhost:3000/categories')
     .then(response => {
        const categoriesData = response.data[0]; 
        setCategories(categoriesData);
      })
     .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Generate a unique bookID
      const newBookID = Math.floor(Math.random() * 10000);
      alert('Book added successfully!');
      const response = await axios.post('http://localhost:3000/books', {
        book_id: newBookID,
        book_name: bookName,
        book_cat_id: bookCatId,
        book_collection_id: bookCollectionId,
        book_launch_date: bookLaunchDate,
        book_publisher: bookPublisher
      });
      console.log('Response:', response.data); // Add this line
      // Display a pop-up alert
      alert('Book added successfully!');
      // Redirect to dashboard
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddCategory = (event) => { event.preventDefault(); navigate('/category'); };
  const handleAddCollection = (event) => { event.preventDefault(); navigate('/collection'); };

  return (
    <div>
      <nav>
        <Link to="/dashboard" className="back-link">Back</Link>
      </nav>
      <div className="bg">
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit}>
          <label>
            BookName:
            <input type="text" value={bookName} onChange={(event) => setBookName(event.target.value)} />
          </label>
          <br />
          <label>
            Book Ctg :
            <select value={bookCatId} onChange={(event) => setBookCatId(event.target.value)}>
              {categories.map(category => (
                <option key={category.cat_id} value={category.cat_id}>
                  {category.cat_id}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Book Col:
            <select value={bookCollectionId} onChange={(event) => setBookCollectionId(event.target.value)}>
              {collections.map(collection => (
                <option key={collection.collection_id} value={collection.collection_id}>
                  {collection.collection_id}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Launch dt:
            <input type="date" value={bookLaunchDate} onChange={(event) => setBookLaunchDate(event.target.value)} />
          </label>
          <br />
          <label>
            Book Pub:
            <input type="text" value={bookPublisher} onChange={(event) => setBookPublisher(event.target.value)} />
          </label>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" id="Add_book">Add Book</button>
            <button type="button" id="Add_cat" onClick={handleAddCategory}>Add Category</button>
            <button type="button" id="Add_col" onClick={handleAddCollection}>Add Collection</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Book;