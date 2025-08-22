import express from 'express';

const router = express.Router();

router.get('/dashboard', (_req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;
