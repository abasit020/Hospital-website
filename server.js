const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/menu - Fetch items from Supabase
app.get('/api/menu', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error fetching menu:', err.message);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

// POST /api/orders - Save order to Supabase
app.post('/api/orders', async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || !total) {
            return res.status(400).json({ error: 'Missing order details' });
        }

        const { data, error } = await supabase
            .from('orders')
            .insert([{ items: JSON.stringify(items), total, created_at: new Date() }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Order placed successfully', order: data ? data[0] : null });
    } catch (err) {
        console.error('Error placing order:', err.message);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
