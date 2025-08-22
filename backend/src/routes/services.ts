import express from 'express';
import pool from '../config/db';
import { verifyJwt } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', verifyJwt, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

  try {
    const { rows } = await pool.query('INSERT INTO services (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', verifyJwt, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query('UPDATE services SET title=$1, description=$2, updated_at=NOW() WHERE id=$3', [title, description, id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Service updated' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', verifyJwt, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM services WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Service deleted' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
