# Hosting on Render with Supabase

Follow these steps to deploy Boba Haven:

### 1. Set up Supabase
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the **SQL Editor** and run the contents of `schema.sql` to create your tables.
3. Go to **Project Settings > API** to find your `URL` and `anon public` key.

### 2. Prepare your Repository
Ensure your code is pushed to a GitHub, GitLab, or Bitbucket repository.

### 3. Create a New Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your repository.

### 4. Configure Environment Variables
In the Render service settings, go to the **Environment** tab and add:
- `SUPABASE_URL`: Your Supabase Project URL.
- `SUPABASE_ANON_KEY`: Your Supabase API Key.

### 5. Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`

---
*Note: If these environment variables are not set, the app will automatically use mock data for demonstration purposes.*
