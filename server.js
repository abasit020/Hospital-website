require('dotenv').config();
const express = require('express');
const path = require('path');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// AI Soil Analysis Engine
const CROP_PROFILES = [
    { name: 'Cocoa', minPh: 5.0, maxPh: 7.5, minMoisture: 70, nitrogenReq: 'high' },
    { name: 'Maize', minPh: 5.5, maxPh: 7.0, minMoisture: 50, nitrogenReq: 'high' },
    { name: 'Cassava', minPh: 4.5, maxPh: 9.0, minMoisture: 30, nitrogenReq: 'low' },
    { name: 'Yam', minPh: 5.5, maxPh: 6.5, minMoisture: 60, nitrogenReq: 'medium' }
];

function analyzeSoil(data) {
    const { ph, nitrogen, phosphorus, potassium, moisture } = data;
    let suitable = [];
    let advice = [];

    // Crop Suitability Logic
    CROP_PROFILES.forEach(crop => {
        if (ph >= crop.minPh && ph <= crop.maxPh && moisture >= crop.minMoisture) {
            suitable.push(crop.name);
        }
    });

    // Heuristic Advice
    if (ph < 5.0) advice.push('Soil is too acidic. Consider adding agricultural lime.');
    if (ph > 7.5) advice.push('Soil is alkaline. Consider adding sulfur or organic mulch.');
    if (nitrogen < 30) advice.push('Low Nitrogen detected. Apply Urea or Nitrogen-rich organic compost.');
    if (phosphorus < 15) advice.push('Low Phosphorus. Apply Triple Super Phosphate or Bone Meal.');
    if (potassium < 60) advice.push('Low Potassium. Apply Muriate of Potash or Wood Ash.');
    if (moisture < 40) advice.push('Soil moisture is low. Implement drip irrigation for better yields.');

    if (suitable.length === 0) {
        suitable.push('Hardy Grasses or Legumes');
        advice.push('General soil improvement required before planting major staples.');
    }

    return {
        suitable_crops: suitable.join(', '),
        recommendation: advice.join(' ') || 'Soil conditions are optimal for the current season.'
    };
}

// API Endpoints
app.post('/api/analyze', async (req, res) => {
    try {
        const { farmer_name, location, ph, nitrogen, phosphorus, potassium, moisture } = req.body;

        const analysis = analyzeSoil({ ph, nitrogen, phosphorus, potassium, moisture });
        const record = {
            farmer_name,
            location,
            ph,
            nitrogen,
            phosphorus,
            potassium,
            moisture,
            ...analysis,
            created_at: new Date().toISOString()
        };

        try {
            const { data, error } = await supabase
                .from('soil_tests')
                .insert([record])
                .select();

            if (error) throw error;
            res.status(201).json(data[0]);
        } catch (dbError) {
            console.warn('DB Error, returning local analysis:', dbError.message);
            // Return the record even if DB fails, so UI works for demo
            res.status(201).json(record);
        }
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/history', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('soil_tests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.json([]); // Return empty history on error
    }
});

app.listen(PORT, () => {
    console.log(`AgroSmart Ghana Server running on http://localhost:${PORT}`);
});
