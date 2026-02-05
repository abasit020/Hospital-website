const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

// Check if credentials exist and are not placeholders
const isValid = supabaseUrl && supabaseKey &&
                supabaseUrl !== 'YOUR_SUPABASE_URL' &&
                supabaseKey !== 'YOUR_SUPABASE_ANON_KEY';

if (!isValid) {
    console.warn('Using Mock Supabase Client because credentials are not provided or invalid.');
    // Mock client for local development/demonstration
    supabase = {
        from: (table) => ({
            select: () => {
                if (table === 'items') {
                    return Promise.resolve({ data: [
                        { id: 1, name: 'Matcha Meadow', price: 40, image: 'https://images.unsplash.com/photo-1627847483517-5a5744c4ec3c?q=80&w=400' },
                        { id: 2, name: 'Taro Cloud', price: 40, image: 'https://images.unsplash.com/photo-1619158403521-ed9795026d47?q=80&w=400' },
                        { id: 3, name: 'Green Zenith', price: 40, image: 'https://images.unsplash.com/photo-1515442261904-6c3e7c30a781?q=80&w=400' },
                        { id: 4, name: 'The Classic Tee', price: 40, image: 'https://images.unsplash.com/photo-1558857563-b371f30ca6a5?q=80&w=400' }
                    ], error: null });
                }
                return Promise.resolve({ data: [], error: null });
            },
            insert: (val) => {
                console.log('Mock DB Insert to', table, ':', val);
                return Promise.resolve({ data: val, error: null });
            }
        })
    };
} else {
    supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;
