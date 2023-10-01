const express = require('express');
const router = express.Router();
const pool = require('../postbase');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.post('/', async (req, res) => {
  const { university_id, token, session_id } = req.body;

  try {

    // Check if the warden exists in the db with the university_id and token
    const wardenQuery = await pool.query(
      'SELECT * FROM Wardens WHERE university_id = $1 AND token = $2',
      [university_id, token]
    );

    if (wardenQuery.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid university ID or token' });
    }

    try {
      // Check if the session exists and is not already booked
      const sessionQuery = await pool.query(
        'SELECT * FROM Sessions WHERE session_id = $1 AND status = $2',
        [session_id, 'not booked']
      );

      if (sessionQuery.rows.length === 0) {
        return res.status(404).json({ error: 'Session does not exist or is already booked' });
      }

      try {
        // Update the session to mark it as booked
        const updateSessionQuery = await pool.query(
          'UPDATE Sessions SET status = $1 WHERE session_id = $2',
          ['booked', session_id]
        );

        if (updateSessionQuery.rowCount === 0) {
          return res.status(404).json({ error: 'Session not found' });
        }

        // Send a success response
        res.json({ message: 'Session booked successfully' });
      } catch (error) {
        console.error('Error updating session:', error.message);
        res.status(500).json({ error: 'Error updating session', detail: error.message });
      }
    } catch (error) {
      console.error('Error checking session:', error.message);
      res.status(500).json({ error: 'Error checking session', detail: error.message });
    }
  } catch (error) {
    console.error('Error checking warden:', error.message);
    res.status(500).json({ error: 'Error checking warden', detail: error.message });
  }
});

module.exports = router;

// book a session with warden c. changes the status to booked.