-- Add some sample gift cards
INSERT INTO gift_cards (business_id, amount, code, purchaser_id, recipient_email, is_redeemed, expiry_date) VALUES
(1, 50.00, 'COFFEE50', 1, 'recipient1@example.com', false, '2025-01-01'),
(1, 25.00, 'COFFEE25', 1, 'recipient2@example.com', false, '2025-01-01'),
(2, 100.00, 'BOOKS100', 1, 'recipient3@example.com', false, '2025-01-01'),
(3, 75.00, 'GREEN75', 1, 'recipient4@example.com', false, '2025-01-01'),
(4, 200.00, 'TECH200', 1, 'recipient5@example.com', false, '2025-01-01'); 