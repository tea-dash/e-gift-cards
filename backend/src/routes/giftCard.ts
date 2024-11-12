import express from 'express';
import pool from '../db';
import crypto from 'crypto';

const router = express.Router();

// Get all gift cards for a business
router.get('/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    console.log('Fetching gift cards for business:', businessId);
    const result = await pool.query(
      'SELECT * FROM gift_cards WHERE business_id = $1',
      [businessId]
    );
    console.log('Found gift cards:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching gift cards:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Purchase a gift card
router.post('/purchase', async (req, res) => {
  try {
    const { businessId, amount, purchaserId, recipientEmail } = req.body;
    
    // Generate a unique code for the gift card
    const code = crypto.randomBytes(8).toString('hex').toUpperCase();
    
    // Set expiry date to 1 year from now
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const result = await pool.query(
      `INSERT INTO gift_cards 
       (business_id, amount, code, purchaser_id, recipient_email, expiry_date) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [businessId, amount, code, purchaserId, recipientEmail, expiryDate]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify and redeem a gift card
router.post('/redeem', async (req, res) => {
  try {
    const { code } = req.body;
    
    const result = await pool.query(
      'UPDATE gift_cards SET is_redeemed = true WHERE code = $1 AND is_redeemed = false RETURNING *',
      [code]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or already redeemed gift card' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router };