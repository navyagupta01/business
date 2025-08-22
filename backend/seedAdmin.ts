import pool from './config/db';
import { hashPassword } from './utils/auth';

const username = 'admin';
const password = 'StrongPassword123';

async function seedAdmin() {
  try {
    const hash = await hashPassword(password);

    const existing = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      console.log('Admin user already exists, skipping seed.');
      process.exit(0);
    }

    await pool.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)', [
      username,
      hash,
      'admin',
    ]);
    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
}

seedAdmin();
