# Deploying AgroSmart Ghana

AgroSmart Ghana is a Node.js application that uses Supabase for data persistence.

### 1. Database Setup
1. Log in to [Supabase](https://supabase.com/).
2. Use the **SQL Editor** to run the commands in `schema.sql`.
3. Obtain your API URL and Anon Key from **Settings > API**.

### 2. Environment Variables
Ensure the following variables are set in your deployment environment (e.g., Render Dashboard):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### 3. Deploy
- **Build Command:** `npm install`
- **Start Command:** `npm start`

---
*AgroSmart Ghana includes a fallback mechanism that allows the AI analysis engine to function even if the database connection is unavailable, ensuring farmers can always get advice in the field.*
