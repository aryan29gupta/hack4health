const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from the root .env if running from backend folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase environment variables! Check your root .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is running correctly.' });
});

// A sample API endpoint
app.get('/api/example', (req, res) => {
  res.json({ data: 'This is sample data from the basic backend architecture.' });
});

// A test endpoint to verify Supabase connection works on the backend
app.get('/api/test-db', async (req, res) => {
  try {
    // Just pulling 1 row from Doctor to test the connection
    const { data, error } = await supabase.from('Doctor').select('*').limit(1);
    
    if (error) throw error;
    
    res.json({ status: 'success', message: 'Successfully connected to Supabase from the backend!', data });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
