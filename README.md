# Boba Haven - Professional Menu Selection

A modern, high-fidelity web application for a Boba and Yogurt business. Features a professional landing page, a functional shopping cart, and a Node.js/Supabase backend.

## Features
- **Signature Flavors:** Matcha Meadow, Taro Cloud, Green Zenith, and The Classic Tee (all GHS 40.00).
- **Professional UI:** Built with HTML, CSS (Glassmorphism), and Vanilla JS. No "AI-generated" look.
- **Cart System:** Add multiple items, adjust quantities, and see real-time totals.
- **Backend:** Node.js/Express server that integrates with Supabase.
- **Cloud Database:** Configured to use Supabase for persistent menu items and orders.

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
3. Set up your environment variables in a `.env` file (see [DEPLOYMENT.md](DEPLOYMENT.md)).
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure
- `public/`: Contains frontend assets (HTML, CSS, JS).
- `db.js`: Supabase connection logic with mock fallback.
- `server.js`: Express API endpoints.
- `schema.sql`: SQL commands to set up your Supabase database.

## Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on how to host this application on Render.
