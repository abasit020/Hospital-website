const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wwiekkmgzldgachygqei.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aWVra21nemxkZ2FjaHlncWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNjE5MjMsImV4cCI6MjA4NTkzNzkyM30.SVWPBq-xMlXB0E0WpOfCW4fxSPj1zNqe_3awlJRF8bc'
);

module.exports = supabase;
