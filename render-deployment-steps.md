# Render Deployment - Step by Step

## Step 1: Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Complete account setup

## Step 2: Create Blueprint
1. Click "New +" in top right
2. Select "Blueprint"
3. Connect your GitHub repository: `dsrisaigaensh/Scholarship_Finder`
4. Click "Connect"

## Step 3: Configure Blueprint
1. Blueprint Name: `scholarship-finder-app`
2. Branch: `main`
3. Click "Create Blueprint"

## Step 4: Set Environment Variables

### For Backend Service:
1. Click on your backend service
2. Go to "Environment" tab
3. Add these variables:

```
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://scholarship-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/scholarshipfinder?retryWrites=true&w=majority
JWT_SECRET=scholarship-finder-jwt-secret-2024-production-key
CORS_ORIGIN=https://scholarship-finder-frontend.onrender.com
```

### For Frontend Service:
1. Click on your frontend service
2. Go to "Environment" tab
3. Add this variable:

```
VITE_API_URL=https://scholarship-finder-backend.onrender.com
```

## Step 5: Deploy
1. Click "Create Blueprint"
2. Wait for deployment (5-10 minutes)
3. Check build logs for any errors

## Step 6: Update URLs
After deployment, update environment variables with actual URLs:
- Replace placeholder URLs with your actual Render URLs
- Update CORS_ORIGIN and VITE_API_URL 