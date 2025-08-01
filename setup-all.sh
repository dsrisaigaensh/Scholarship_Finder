#!/bin/bash

echo "🚀 Scholarship Finder - Complete Setup Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi
print_success "Node.js is installed"

# Check if npm is installed
print_status "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_success "npm is installed"

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
cd ..

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Create .env files if they don't exist
print_status "Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    print_success "Created backend/.env from template"
else
    print_warning "backend/.env already exists"
fi

if [ ! -f ".env" ]; then
    cp env.example .env
    print_success "Created .env from template"
else
    print_warning ".env already exists"
fi

# Test MongoDB connection
print_status "Testing MongoDB connection..."
cd backend
node -e "
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarshipfinder';

console.log('Testing MongoDB connection...');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  process.exit(0);
})
.catch(err => {
  console.log('❌ MongoDB connection failed:', err.message);
  console.log('Please set up MongoDB Atlas and update your MONGODB_URI');
  process.exit(1);
});
"

if [ $? -eq 0 ]; then
    print_success "MongoDB connection test passed"
else
    print_warning "MongoDB connection failed - you'll need to set up MongoDB Atlas"
fi
cd ..

# Setup admin user
print_status "Setting up admin user..."
cd backend
node setup-admin.js
cd ..

print_success "Setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Set up MongoDB Atlas (see setup-mongodb.md)"
echo "2. Update your .env files with production values"
echo "3. Deploy to Render (see deploy-to-render.md)"
echo ""
echo "📚 Documentation:"
echo "- MongoDB Setup: setup-mongodb.md"
echo "- Render Deployment: deploy-to-render.md"
echo "- Complete Guide: DEPLOYMENT.md"
echo ""
echo "🔑 Admin Credentials:"
echo "- Email: admin@example.com"
echo "- Password: hashedpassword123"
echo "- Role: superadmin"
echo ""
print_success "Setup script completed successfully!" 