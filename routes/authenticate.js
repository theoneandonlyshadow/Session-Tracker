const express = require('express');
const router = express.Router();
const pool = require('../postbase');

router.post('/', async (req, res) => {
  const { university_id, password } = req.body;

  try {
    // Check if the warden exists in the db
    const result = await pool.query(
      'SELECT * FROM Wardens WHERE university_id=$1 AND password=$2',
      [university_id, password]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid university ID or password' });
    } else {
      // Generate a token and store it in the db
      const tokenResult = await pool.query(
        'UPDATE Wardens SET token=uuid_generate_v4() WHERE university_id=$1 AND password=$2 RETURNING token',
        [university_id, password]
      );

      const token = tokenResult.rows[0].token; // checks if token was generated or not
      if (token) {
        // Send the token
        res.json({ "token generated": token });
      } else {
        res.status(500).json({ error: 'Token generation error.' });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ "error": 'Internal server error' });
  }
});

module.exports = router;

// check if users exist in db, if they do, give them token.