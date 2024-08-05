const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sneha',
  database: 'lib',
  namedPlaceholders: true,
});

// Create a promise-based query function
async function query(sql, params) {
  const [rows] = await db.execute(sql, params);
  return rows;
}

// API Endpoints

// Get all books
app.get('/books', async (req, res) => {
  const rows = await query('SELECT * FROM book');
  res.json(rows);
});


// Create new book
app.post('/books', (req, res) => {
  const bookID = req.body.book_id;
  const bookName = req.body.book_name;
  const bookCatId = req.body.book_cat_id;
  const bookCollectionId = req.body.book_collection_id;
  const bookLaunchDate = req.body.book_launch_date;
  const bookPublisher = req.body.book_publisher;

  const query = `INSERT INTO book (book_id, book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [bookID, bookName, parseInt(bookCatId), bookCollectionId, bookLaunchDate, bookPublisher], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error adding book' });
    } else {
      res.send({ message: 'Book added successfully' });
    }
  });
});

// Update book
app.put('/books/:id', async (req, res) => {
  const id = req.params.id;
  const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
  const [result] = await query('UPDATE book SET? WHERE book_id =?', [
    {
      book_name,
      book_cat_id,
      book_collection_id,
      book_launch_date,
      book_publisher
    },
    id
  ]);
  res.json({ message: 'Book updated successfully' });
});

// Delete book
app.delete('/books/:id', async (req, res) => {
  const id = req.params.id;
  const [result] = await query('DELETE FROM book WHERE book_id =?', [id]);
  res.json({ message: 'Book deleted successfully' });
});

// Get all members
app.get('/members', async (req, res) => {
  const rows = await query('SELECT * FROM member');
  res.json(rows);
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await db.execute('SELECT * FROM category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
});

app.get('/collections', async (req, res) => {
  try {
    const collections = await db.execute('SELECT * FROM collection');
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving collections' });
  }
});
app.post('/categories', (req, res) => {
  const { cat_name, sub_cat_name } = req.body;
  const query = 'INSERT INTO category (cat_name, sub_cat_name) VALUES (?, ?)';
  db.query(query, [cat_name, sub_cat_name], (err, results) => {
    if (err) {
      console.error('error running query:', err);
      res.status(500).send({ message: 'Error creating category' });
    } else {
      res.send({ message: 'Category created successfully' });
    }
  });
});

app.post('/collections', (req, res) => {
  const collectionName = req.body.collection_name;
  db.query(`INSERT INTO collections (collection_name) VALUES ($1)`, [collectionName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error adding collection' });
    } else {
      res.send({ message: 'Collection added successfully' });
    }
  });
});


// Get member by ID
app.get('/members/:id', async (req, res) => {
  const id = req.params.id;
  const [rows] = await query('SELECT * FROM member WHERE mem_id =?', [id]);
  res.json(rows[0]);
});

app.post('/members', async (req, res) => {
  try {
    const { mem_name, mem_phone, mem_email } = req.body;
    const mem_id = Math.floor(Math.random() * 10000); // Generate a unique mem_id
    const query = 'INSERT INTO member (mem_id, mem_name, mem_phone, mem_email) VALUES (?,?,?,?)';
    const params = [mem_id, mem_name, mem_phone, mem_email];
    const [rows] = await db.execute(query, params);
    res.json({ message: 'Member added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding member' });
  }
});

// Update member
app.put('/members/:id', async (req, res) => {
  const id = req.params.id;
  const { mem_name, mem_phone, mem_email } = req.body;
  const [result] = await query('UPDATE member SET? WHERE mem_id =?', [
    {
      mem_name,
      mem_phone,
      mem_email
    },
    id
  ]);
  res.json({ message: 'Member updated successfully' });
});

// Delete member
app.delete('/members/:id', async (req, res) => {
  const id = req.params.id;
  const [result] = await query('DELETE FROM member WHERE mem_id =?', [id]);
  res.json({ message: 'Member deleted successfully' });
});

app.get('/issuances', async (req, res) => {
  try {
    const results = await db.execute('SELECT * FROM issuance');
    res.send(results);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving issuances' });
  }
});

// Get all issuances
app.get('/api/issuances', async (req, res) => {
  try {
    const issuances = await query('SELECT * FROM issuance');
    const books = await query('SELECT * FROM book');
    res.json(issuances.map(issuance => {
      const book = books.find(book => book.book_id === issuance.book_id);
      return {
       ...issuance,
        book_name: book.book_name,
        author: book.book_publisher
      };
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving issuances' });
  }
});


app.get('/api/issuances/filter', (req, res) => {
  const targetReturnDate = req.query.targetReturnDate;
  const status = req.query.status;

  if (!targetReturnDate || !status) {
    return res.status(400).send({ message: 'Please provide both target return date and status' });
  }

  const filteredIssuances = issuances.filter((issuance) => {
    return issuance.target_return_date === targetReturnDate && issuance.issuance_status === status;
  });

  res.send(filteredIssuances);
});


app.post('/issuances', async (req, res) => {
  const { book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status } = req.body;
  try {
    const [result] = await query('INSERT INTO issuance SET ?', {
      book_id,
      issuance_date,
      issuance_member,
      issued_by,
      target_return_date,
      issuance_status
    });
    res.json({ message: 'Issuance added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update issuance
app.put('/issuances/:id', async (req, res) => {
  const id = req.params.id;
  const { book_id, issuance_date, issuance_member, issued_by, target_return_date, issuance_status } = req.body;
  const [result] = await query('UPDATE issuance SET? WHERE issuance_id =?', [
    {
      book_id,
      issuance_date,
      issuance_member,
      issued_by,
      target_return_date,
      issuance_status
    },
    id
  ]);
  res.json({ message: 'Issuance updated successfully' });
});

// Delete issuance
app.delete('/issuances/:id', async (req, res) => {
  const id = req.params.id;
  const [result] = await query('DELETE FROM issuance WHERE issuance_id =?', [id]);
  res.json({ message: 'Issuance deleted successfully' });
});

// Get all books that have never been borrowed
app.get('/books/never-borrowed', async (req, res) => {
  const rows = await query('SELECT * FROM book WHERE book_id NOT IN (SELECT book_id FROM issuance)');
  res.json(rows);
});

// Get outstanding books at any given point in time
app.get('/books/outstanding', async (req, res) => {
  const rows = await query('SELECT * FROM issuance WHERE issuance_status = "borrowed"');
  res.json(rows);
});

// Get top 10 most borrowed books
app.get('/books/most-borrowed', async (req, res) => {
  const rows = await query(`
  SELECT 
  b.book_name, 
  COUNT(i.issuance_id) AS num_borrowed, 
  COUNT(DISTINCT i.issuance_member) AS num_members
FROM 
  book b 
  JOIN issuance i ON b.book_id = i.book_id
GROUP BY 
  b.book_name
ORDER BY 
  num_borrowed DESC
LIMIT 10;
  `);
  const mostBorrowedBooks = rows.map(row => ({
    bookName: row.book_name,
    numBorrowed: row.num_borrowed,
    numMembers: row.num_borrowed
  }));
  res.json(mostBorrowedBooks);
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});