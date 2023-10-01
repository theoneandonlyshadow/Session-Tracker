const express = require('express');
const router = express.Router();
const pool = require('../postbase');

router.post('/', async (req, res) => {
  const { university_id, token } = req.body;

  try {
    // Check if the warden exists in the db with the given token
    const result = await pool.query(
      'SELECT * FROM Wardens WHERE university_id=$1 AND token=$2',
      [university_id, token]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid university ID or token' });
    } else {
      // Retrieve sessions table from postgres
      const sessionsData = await pool.query(
        'SELECT * FROM Sessions'
      );

      // Send the sessions table in the response
      res.json(sessionsData.rows);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// once authenticated, see all slots that are book and not booked.