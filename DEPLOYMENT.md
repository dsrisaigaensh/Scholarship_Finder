# Deployment Guide with Environment Variables

## Using .env Files with Render

### Step 1: Create Your .env Files

#### Backend (.env file in backend/ directory)
```bash
# Copy the example file
cp backend/env.example backend/.env
```

Then edit `backend/.env` with your actual values:
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/scholarshipfinder?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-service-name.onrender.com
```

#### Frontend (.env file in root directory)
```bash
# Copy the example file
cp env.example .env
```

Then edit `.env` with your actual values:
```env
VITE_API_URL=https://your-backend-service-name.onrender.com
```

### Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account

2. **Create Database:**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select cloud provider and region
   - Click "Create"

3. **Set Up Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 3: Deploy on Render

#### Option A: Using .env Files (Recommended)

1. **Create .env files locally** with your production values
2. **In Render Environment Variables section:**
   - Click "Add from .env"
   - Upload your backend/.env file for backend service
   - Upload your .env file for frontend service

#### Option B: Manual Environment Variables

**For Backend Service:**
| Variable Name | Value |
|---------------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/scholarshipfinder?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` |
| `CORS_ORIGIN` | `https://your-frontend-service-name.onrender.com` |

**For Frontend Service:**
| Variable Name | Value |
|---------------|-------|
| `VITE_API_URL` | `https://your-backend-service-name.onrender.com` |

### Step 4: Update render.yaml (Optional)

You can also define environment variables directly in render.yaml:

```yaml
services:
  - type: web
    name: scholarship-finder-backend
    env: node
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false  # Set this in Render dashboard
      - key: JWT_SECRET
        sync: false  # Set this in Render dashboard
      - key: CORS_ORIGIN
        value: https://scholarship-finder-frontend.onrender.com

  - type: web
    name: scholarship-finder-frontend
    env: static
    plan: free
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_URL
        value: https://scholarship-finder-backend.onrender.com
```

### Step 5: Verify Deployment

1. **Check Backend Health:**
   - Visit: `https://your-backend-service-name.onrender.com/api/users`
   - Should return JSON or error (not 404)

2. **Check Frontend:**
   - Visit your frontend URL
   - Test login/signup functionality
   - Check browser console for API errors

### Troubleshooting

**Common Issues:**
1. **MongoDB Connection Failed:**
   - Check connection string format
   - Verify username/password
   - Ensure network access allows all IPs

2. **Frontend Can't Connect to Backend:**
   - Verify `VITE_API_URL` is correct
   - Check CORS settings
   - Ensure backend is running

3. **Environment Variables Not Working:**
   - Check variable names (case-sensitive)
   - Verify values are set correctly
   - Restart services after changes

### Security Notes

- **Never commit .env files** to Git (they're in .gitignore)
- **Use strong JWT secrets** in production
- **Limit CORS origins** to your actual domains
- **Use environment-specific values** for different deployments 