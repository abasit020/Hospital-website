const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase_url_here')) {
    console.warn('Using Mock Supabase Client because credentials are not provided or invalid.');
    // Mock client for development/verification without real credentials
    supabase = {
        from: (table) => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: (data) => ({
                select: () => Promise.resolve({ data: [data[0]], error: null })
            })
        })
    };
} else {
    supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;
