import express from 'express';
import pool from '../config/db';
import { verifyJwt } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', verifyJwt, async (req, res) => {
  const { name, company, message, rating } = req.body;
  if (!name || !message || !rating) return res.status(400).json({ error: 'Missing fields' });

  try {
    const { rows } = await pool.query(
      'INSERT INTO testimonials (name, company, message, rating, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, company || '', message, rating]
    );
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { name, company, message, rating } = req.body;
  try {
    const result = await pool.query(
      'UPDATE testimonials SET name=$1, company=$2, message=$3, rating=$4 WHERE id=$5',
      [name, company, message, rating, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Testimonial updated' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', verifyJwt, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
