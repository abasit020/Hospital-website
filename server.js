require('dotenv').config();
const express = require('express');
const path = require('path');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Get Menu
app.get('/api/menu', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*');

        if (error) throw error;
        res.json(data || []);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const { customer_name, total, items } = req.body;

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                customer_name,
                total,
                items: items
            }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json(data[0]);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
