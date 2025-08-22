import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required' });

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const query = 'INSERT INTO contacts (name, email, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id';
    const { rows } = await pool.query(query, [name, email, message]);
    res.status(201).json({ message: 'Message received', id: rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
