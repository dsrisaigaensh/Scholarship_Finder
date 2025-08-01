# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create account

## Step 2: Create Database

1. **Click "Build a Database"**
2. **Choose "FREE" tier** (M0)
3. **Select Cloud Provider:**
   - AWS (recommended)
   - Google Cloud
   - Azure
4. **Choose Region:** Select closest to your users
5. **Click "Create"**

## Step 3: Set Up Database Access

1. **Go to "Database Access"** (left sidebar)
2. **Click "Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `scholarship-admin`
5. **Password:** Create a strong password (save this!)
6. **Database User Privileges:** "Read and write to any database"
7. **Click "Add User"**

## Step 4: Set Up Network Access

1. **Go to "Network Access"** (left sidebar)
2. **Click "Add IP Address"**
3. **Click "Allow Access from Anywhere"** (0.0.0.0/0)
4. **Click "Confirm"**

## Step 5: Get Connection String

1. **Go to "Database"** (left sidebar)
2. **Click "Connect"**
3. **Choose "Connect your application"**
4. **Copy the connection string**

## Step 6: Update Your .env Files

### Backend (.env)
Replace the MONGODB_URI with your actual connection string:

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://scholarship-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/scholarshipfinder?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://scholarship-finder-frontend.onrender.com
```

### Frontend (.env)
```env
VITE_API_URL=https://scholarship-finder-backend.onrender.com
```

## Step 7: Test Connection

Run this command to test your MongoDB connection:
```bash
cd backend
npm install
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarshipfinder')
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection failed:', err));
"
```

## Important Notes:

- **Save your password securely** - you'll need it for deployment
- **The connection string format:** `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **Replace `<password>`** in the connection string with your actual password
- **Database name:** `scholarshipfinder` (will be created automatically) 