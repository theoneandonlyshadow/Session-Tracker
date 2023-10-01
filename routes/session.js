const express = require('express');
const router = express.Router();
const pool = require('../postbase');


router.post('/', async (req, res) => {
  const { university_id, token } = req.body;

  try {
    // Check if the warden exists in the db with the givenn token
    const wardenQuery = await pool.query(
      'SELECT * FROM Wardens WHERE university_id=$1 AND token=$2',
      [university_id, token]
    );

    if (wardenQuery.rows.length === 0) {
      res.status(401).json({ error: 'Invalid university ID or token' });
    } else {
      // Retrieve sessions table
      const sessionsData = await pool.query(
        'SELECT * FROM Sessions WHERE status = $1',
        ['booked']
      );

      res.json(sessionsData.rows);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
