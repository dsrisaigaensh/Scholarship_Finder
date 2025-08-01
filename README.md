# Scholarship Finder

A full-stack web application for finding and applying to scholarships. Built with React (frontend) and Node.js/Express (backend).

## Features

- **User Authentication**: Student and admin login/signup
- **Scholarship Search**: Advanced filtering by category, income, academic level, and gender
- **Application Management**: Track applied scholarships and manage applications
- **Admin Panel**: User management and application oversight
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Deployment to Render

This project is configured for deployment on Render with the following services:

### 1. Backend Service (Web Service)

**Configuration:**
- **Environment**: Node.js
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: Free

**Environment Variables:**
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB connection string (set in Render dashboard)
- `PORT`: Automatically set by Render

### 2. Frontend Service (Static Site)

**Configuration:**
- **Environment**: Static Site
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `./dist`
- **Plan**: Free

**Environment Variables:**
- `VITE_API_URL`: URL of your backend service (e.g., `https://your-backend-name.onrender.com`)

## Deployment Steps

### Step 1: Prepare Your Repository

1. Ensure your code is pushed to a Git repository (GitHub, GitLab, etc.)
2. Make sure all the configuration files are in place:
   - `render.yaml` (deployment configuration)
   - `backend/package.json` (with start script)
   - `frontend/package.json` (with build script)

### Step 2: Set Up MongoDB

1. Create a MongoDB database (MongoDB Atlas recommended for production)
2. Get your MongoDB connection string
3. Note: You'll need to set this as an environment variable in Render

### Step 3: Deploy on Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in to your account

2. **Connect Your Repository**
   - Click "New +" and select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   - In the backend service settings, add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`

4. **Update Frontend API URL**
   - Once your backend is deployed, copy its URL
   - In the frontend service settings, set:
     - `VITE_API_URL`: Your backend service URL

### Step 4: Verify Deployment

1. **Backend Health Check**
   - Visit your backend URL + `/api/users` (should return JSON or error)
   - Check Render logs for any startup issues

2. **Frontend Verification**
   - Visit your frontend URL
   - Test the application functionality
   - Check browser console for API connection errors

## Local Development

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
npm install
npm run dev
```

### Environment Variables (Local)
Create `.env` files in respective directories:

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/scholarshipfinder
PORT=4000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:4000
```

## Project Structure

```
scholar/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── config/            # Configuration files
│   └── main.tsx           # App entry point
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## Troubleshooting

### Common Issues

1. **Backend Won't Start**
   - Check MongoDB connection string
   - Verify all environment variables are set
   - Check Render logs for detailed error messages

2. **Frontend Can't Connect to Backend**
   - Verify `VITE_API_URL` is set correctly
   - Ensure backend service is running
   - Check CORS configuration

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs for specific errors

### Render-Specific Tips

- **Free Tier Limitations**: Free services sleep after 15 minutes of inactivity
- **Build Time**: First build may take 5-10 minutes
- **Environment Variables**: Must be set before deployment
- **Custom Domains**: Available on paid plans

## Support

For deployment issues:
1. Check Render documentation: [docs.render.com](https://docs.render.com)
2. Review application logs in Render dashboard
3. Verify environment variables are correctly set

## License

This project is open source and available under the [MIT License](LICENSE). 