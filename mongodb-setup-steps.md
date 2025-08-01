# MongoDB Atlas Setup - Step by Step

## Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create account

## Step 2: Create Database
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select Cloud Provider: AWS (recommended)
4. Choose Region: Singapore (Southeast Asia)
5. Click "Create"

## Step 3: Set Up Database Access
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `scholarship-admin`
5. Password: Create a strong password (save this!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Set Up Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Step 6: Update Environment Variables
Use this format for your connection string:
```
mongodb+srv://scholarship-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/scholarshipfinder?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` with your actual password
- `cluster0.abc123` with your actual cluster name 