-- First, create a sample user as owner
INSERT INTO users (email, password_hash, name) 
VALUES ('owner@example.com', '$2a$10$6KqJqxtuPkj6UBCKgRvdtOG45L9McwGHmv8uHDT4JYLxwOyXgJ5Sm', 'Business Owner')
RETURNING id;

-- Insert sample businesses
INSERT INTO businesses (name, description, address, owner_id) VALUES
('The Coffee House', 'Artisanal coffee and pastries', '123 Main St, Anytown, USA', 1),
('Books & Beyond', 'Independent bookstore with rare finds', '456 Oak Ave, Anytown, USA', 1),
('Green Grocers', 'Local organic produce and specialty foods', '789 Elm St, Anytown, USA', 1),
('Tech Haven', 'Electronics repair and custom builds', '321 Pine Rd, Anytown, USA', 1),
('Fitness First', 'Full-service gym and wellness center', '654 Maple Dr, Anytown, USA', 1); 