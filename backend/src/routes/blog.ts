import express from 'express';
import pool from '../config/db';
import { verifyJwt, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog WHERE published = TRUE ORDER BY created_at DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM blog WHERE slug = $1 AND published = TRUE', [slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', verifyJwt, async (req: AuthRequest, res) => {
  const { title, summary, content, slug } = req.body;
  if (!title || !summary || !content || !slug) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Runtime check to satisfy TypeScript
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO blog (title, summary, content, slug, author_id, published, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, TRUE, NOW(), NOW()) RETURNING *',
      [title, summary, content, slug, req.user.id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', verifyJwt, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { title, summary, content, slug } = req.body;

  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const result = await pool.query(
      'UPDATE blog SET title=$1, summary=$2, content=$3, slug=$4, updated_at=NOW() WHERE id=$5',
      [title, summary, content, slug, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Blog updated' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', verifyJwt, async (req: AuthRequest, res) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const result = await pool.query('DELETE FROM blog WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Blog deleted' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
