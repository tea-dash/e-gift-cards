import express from 'express';
import pool from '../db';

const router = express.Router();

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM businesses');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a business (protected route to be added later)
router.post('/', async (req, res) => {
  try {
    const { name, description, address, owner_id } = req.body;
    const result = await pool.query(
      'INSERT INTO businesses (name, description, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, address, owner_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single business
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM businesses WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Business not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router };