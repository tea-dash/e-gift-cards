import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/auth';
import { router as businessRouter } from './routes/business';
import { router as giftCardRouter } from './routes/giftCard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/business', businessRouter);
app.use('/api/gift-cards', giftCardRouter);

// Add a test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 