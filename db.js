require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Fallback to the credentials provided by the user for a "just works" experience
const supabaseUrl = process.env.SUPABASE_URL || 'https://wwiekkmgzldgachygqei.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aWVra21nemxkZ2FjaHlncWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNjE5MjMsImV4cCI6MjA4NTkzNzkyM30.SVWPBq-xMlXB0E0WpOfCW4fxSPj1zNqe_3awlJRF8bc';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.warn('Note: Using default Supabase credentials. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables for production.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
