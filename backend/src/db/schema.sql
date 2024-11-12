CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  owner_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gift_cards (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id),
  amount DECIMAL(10,2) NOT NULL,
  code VARCHAR(255) UNIQUE NOT NULL,
  is_redeemed BOOLEAN DEFAULT FALSE,
  purchaser_id INTEGER REFERENCES users(id),
  recipient_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP
); 