# Boba Haven - Professional Menu Selection

A modern, high-fidelity web application for a Boba and Yogurt business. Features a professional Uber Eats-style interface, a functional shopping cart, and a Node.js/Supabase backend.

## Features
- **Signature Flavors:** Matcha Meadow, Taro Cloud, Green Zenith, and The Classic Tee (all GHS 40.00).
- **Professional UI:** Uber Eats design system implementation with sticky headers, minimalist cards, and a sleek cart sidebar.
- **Cart System:** Add multiple items, adjust quantities, and see real-time totals.
- **Backend:** Node.js/Express server that integrates directly with Supabase.
- **Cloud Database:** Persistent menu items and orders stored in Supabase.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- A [Supabase](https://supabase.com/) account.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file (see [DEPLOYMENT.md](DEPLOYMENT.md)):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure
- `public/`: Contains frontend assets (HTML, CSS, JS).
- `db.js`: Supabase connection logic.
- `server.js`: Express API endpoints.
- `schema.sql`: SQL commands to set up your Supabase database.

## Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on how to host this application on Render.
