# Hosting on Render

Follow these steps to deploy your Boba Haven website to Render:

### 1. Prepare your Repository
Ensure your code is pushed to a GitHub, GitLab, or Bitbucket repository.

### 2. Create a New Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your repository.

### 3. Configure Settings
Set the following values during setup:
- **Name**: `boba-haven` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose the one closest to you.
- **Branch**: `main` (or your primary branch)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Set Environment Variables
For the database to work, you need to add your Supabase credentials:
1. Go to the **Environment** tab in your Render service settings.
2. Add the following variables:
   - `SUPABASE_URL`: Your Supabase Project URL.
   - `SUPABASE_ANON_KEY`: Your Supabase Project API Key.
   - `PORT`: `3000` (Render usually handles this automatically, but you can set it to be safe).

### 5. Deploy
Click **Create Web Service**. Render will build and deploy your app. Once finished, you will receive a URL (e.g., `https://boba-haven.onrender.com`) where your site is live!

---
*Note: If you haven't set up your Supabase database yet, the app will automatically use mock data so the website remains functional for demonstration.*
