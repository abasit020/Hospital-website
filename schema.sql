-- Use these SQL commands in your Supabase SQL Editor to set up the database

-- 1. Create the items table (for the menu)
CREATE TABLE IF NOT EXISTS items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT DEFAULT 'signature',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name TEXT, -- Added for better order tracking
  total NUMERIC NOT NULL, -- Renamed to 'total' to match initial schema suggestion
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (Allowing anyone to read menu and insert orders for this demo)
CREATE POLICY "Allow public read access to items" ON items FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to orders" ON orders FOR INSERT WITH CHECK (true);

-- 5. Seed the initial menu items
INSERT INTO items (name, price, category, image_url) VALUES
('Matcha Meadow', 40.00, 'signature', 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400'),
('Taro Cloud', 40.00, 'signature', 'https://images.unsplash.com/photo-1558857563-b371f30ca6a5?q=80&w=400'),
('Green Zenith', 40.00, 'signature', 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=400'),
('The Classic Tee', 40.00, 'signature', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400');
