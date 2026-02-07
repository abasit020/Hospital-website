# AgroSmart Ghana - AI Soil Monitor

A professional, AI-driven soil monitoring and crop recommendation platform designed specifically for farmers in Ghana.

## Features
- **AI Soil Analysis:** Heuristic engine that analyzes pH, NPK levels, and moisture to provide localized agricultural advice.
- **Crop Suitability:** Recommends optimal Ghanaian staples such as Cocoa, Maize, Cassava, and Yam based on real-time soil data.
- **Historical Tracking:** Keep records of soil tests across different locations and seasons.
- **Professional Dashboard:** A clean, high-fidelity user interface built for ease of use in the field.
- **Secure Backend:** Node.js/Express server with Supabase integration for persistent data storage.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Supabase](https://supabase.com/) account for data persistence.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   - `SUPABASE_URL`: Your Supabase Project URL.
   - `SUPABASE_ANON_KEY`: Your Supabase API Key.
4. Start the server:
   ```bash
   npm start
   ```

## Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Inter font), JavaScript.
- **Backend:** Node.js, Express.
- **Database:** Supabase (PostgreSQL).
- **Analysis:** Logic-based AI recommendation engine.

## Deployment
AgroSmart Ghana is optimized for deployment on platforms like Render or Vercel. Ensure environment variables are configured in your hosting dashboard.
