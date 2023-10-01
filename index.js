const express = require('express'); // express library
const bodyParser = require('body-parser'); // handle data that is sent in HTTP
const pool = require("./postbase.js"); // postgresql file
const port = 8069;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


pool.on('error', (err) => {
  console.error('Database connection error:', err);
});


app.listen(port, () => {
  console.log(`Postgres + Node.js running on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ "message": "welcome to root route of this project!" });
});

// 404 NOT FOUND
app.get('/:universalURL', (req, res) => {
  res.send("404 URL NOT FOUND");
});

// Enable uuid-ossp module
pool.query(`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('uuid-ossp module enabled successfully');

    // Create Wardens table
    pool.query(`
    CREATE TABLE IF NOT EXISTS Wardens (
      id SERIAL PRIMARY KEY,
      university_id VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      token UUID
    );
    `, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Wardens table created successfully');

        // Create Sessions table
        pool.query(`
        CREATE TABLE IF NOT EXISTS Sessions (
          id SERIAL PRIMARY KEY,
          warden_id INT,
          start_time varchar(20),
          end_time varchar(20),
          day_of_week varchar(50),
          status varchar(20)
        );
        `, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Sessions table created successfully');
            
          }
        });
      }
    });
  }
});

// Authentication and Token Generation Route
const authenticate = require('./routes/authenticate');
app.use('/authenticate', authenticate);

// Login Route
const login = require('./routes/login');
app.use('/login', login);

// Book Route
const book = require('./routes/book');
app.use('/book', book);

// Sessions Route
const sessions = require('./routes/session.js');
app.use('/sessions', sessions);

module.exports = app;

