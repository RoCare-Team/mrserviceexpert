const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = 5000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: '162.0.235.46',
  port: 3306,
  user: 'sharjenw_mrservice_expert',
  password: '98xL[io-1bdd',
  database: 'sharjenw_mrservice_expert'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
  } else {
    console.log('✅ MySQL connection established successfully');
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Server is up and running');
});


// Actual data endpoint
app.get('/users_details', (req, res) => {
  connection.query('SELECT * FROM users LIMIT 5', (err, result) => {
    if (err) {
      console.error('❌ Error fetching users:', err.message);
      return res.status(500).send('Failed to fetch users');
    }
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
