# Render Deployment Guide

## Step 1: Prepare Your Repository

✅ **Already Done:**
- Code is pushed to GitHub
- render.yaml is configured
- Environment variables are set up

## Step 2: Deploy on Render

### 2.1 Sign Up/Login to Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Login to your account

### 2.2 Create Blueprint
1. **Click "New +"** in the top right
2. **Select "Blueprint"**
3. **Connect your GitHub repository:**
   - Search for: `dsrisaigaensh/Scholarship_Finder`
   - Click "Connect"

### 2.3 Configure Services
Render will automatically detect your `render.yaml` and create:
- **Backend Service** (scholarship-finder-backend)
- **Frontend Service** (scholarship-finder-frontend)

### 2.4 Set Environment Variables

#### For Backend Service:
1. **Click on your backend service**
2. **Go to "Environment" tab**
3. **Add these variables:**

| Variable Name | Value |
|---------------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://scholarship-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/scholarshipfinder?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` |
| `CORS_ORIGIN` | `https://scholarship-finder-frontend.onrender.com` |

#### For Frontend Service:
1. **Click on your frontend service**
2. **Go to "Environment" tab**
3. **Add this variable:**

| Variable Name | Value |
|---------------|-------|
| `VITE_API_URL` | `https://scholarship-finder-backend.onrender.com` |

### 2.5 Deploy
1. **Click "Create Blueprint"**
2. **Wait for deployment** (5-10 minutes)
3. **Check build logs** for any errors

## Step 3: Verify Deployment

### 3.1 Backend Health Check
Visit: `https://scholarship-finder-backend.onrender.com/api/users`
- Should return JSON or error (not 404)

### 3.2 Frontend Check
Visit: `https://scholarship-finder-frontend.onrender.com`
- Should load the application
- Test login/signup functionality

### 3.3 Admin Setup
1. **Visit your frontend URL**
2. **Go to login page**
3. **Use admin credentials:**
   - Email: `admin@example.com`
   - Password: `hashedpassword123`
   - Account Type: Admin

## Step 4: Troubleshooting

### Common Issues:

1. **Backend Won't Start:**
   - Check MongoDB connection string
   - Verify environment variables are set
   - Check Render logs

2. **Frontend Can't Connect:**
   - Verify `VITE_API_URL` is correct
   - Check CORS settings
   - Ensure backend is running

3. **Build Failures:**
   - Check Node.js version
   - Verify all dependencies
   - Review build logs

### Render Logs:
1. **Go to your service in Render**
2. **Click "Logs" tab**
3. **Check for error messages**

## Step 5: Custom Domain (Optional)

1. **Go to your service settings**
2. **Click "Settings" tab**
3. **Scroll to "Custom Domains"**
4. **Add your domain**

## Step 6: Monitoring

### Free Plan Limitations:
- **Spins down after 15 minutes** of inactivity
- **No SSH access**
- **No scaling**
- **No persistent disks**

### Upgrade Options:
- **Starter:** $7/month (better performance)
- **Standard:** $25/month (production ready)
- **Pro:** $50/month (enterprise features)

## Success Checklist:

- ✅ Backend service is running
- ✅ Frontend service is running
- ✅ MongoDB connection is working
- ✅ Admin login works
- ✅ User registration works
- ✅ Scholarship application works
- ✅ Admin panel is accessible

## Support:

- **Render Docs:** [docs.render.com](https://docs.render.com)
- **MongoDB Atlas:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **GitHub Issues:** Create issues in your repository 