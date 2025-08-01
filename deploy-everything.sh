#!/bin/bash

echo "🚀 SCHOLARSHIP FINDER - COMPLETE DEPLOYMENT"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

echo "📋 DEPLOYMENT CHECKLIST"
echo "========================"
echo ""
echo "✅ 1. Code is ready (render.yaml fixed)"
echo "✅ 2. GitHub repository is updated"
echo "⏳ 3. MongoDB Atlas setup needed"
echo "⏳ 4. Render deployment needed"
echo "⏳ 5. Environment variables setup needed"
echo "⏳ 6. Testing needed"
echo ""

print_status "Starting deployment process..."

echo ""
echo "🔧 STEP 1: MONGODB ATLAS SETUP"
echo "================================"
echo "1. Go to mongodb.com/atlas"
echo "2. Create free account"
echo "3. Create database (FREE tier)"
echo "4. Set up database user: scholarship-admin"
echo "5. Set up network access (allow all IPs)"
echo "6. Get connection string"
echo ""

read -p "Have you completed MongoDB Atlas setup? (y/n): " mongodb_ready

if [ "$mongodb_ready" != "y" ]; then
    print_warning "Please complete MongoDB Atlas setup first"
    echo "See: mongodb-setup-steps.md"
    exit 1
fi

print_success "MongoDB Atlas setup completed!"

echo ""
echo "🌐 STEP 2: RENDER DEPLOYMENT"
echo "============================="
echo "1. Go to render.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New +' → 'Blueprint'"
echo "4. Connect repository: dsrisaigaensh/Scholarship_Finder"
echo "5. Set environment variables"
echo "6. Deploy and wait 5-10 minutes"
echo ""

read -p "Have you started Render deployment? (y/n): " render_started

if [ "$render_started" != "y" ]; then
    print_warning "Please start Render deployment"
    echo "See: render-deployment-steps.md"
    exit 1
fi

print_success "Render deployment started!"

echo ""
echo "⚙️ STEP 3: ENVIRONMENT VARIABLES"
echo "================================"
echo ""

echo "BACKEND SERVICE VARIABLES:"
echo "-------------------------"
echo "NODE_ENV=production"
echo "PORT=4000"
echo "MONGODB_URI=mongodb+srv://scholarship-admin:YOUR_PASSWORD@cluster0.abc123.mongodb.net/scholarshipfinder?retryWrites=true&w=majority"
echo "JWT_SECRET=scholarship-finder-jwt-secret-2024-production-key"
echo "CORS_ORIGIN=https://scholarship-finder-frontend.onrender.com"
echo ""

echo "FRONTEND SERVICE VARIABLES:"
echo "--------------------------"
echo "VITE_API_URL=https://scholarship-finder-backend.onrender.com"
echo ""

print_warning "Remember to replace YOUR_PASSWORD and cluster0.abc123 with your actual values!"

echo ""
echo "🧪 STEP 4: TESTING"
echo "==================="
echo ""

read -p "Are your services deployed? (y/n): " services_deployed

if [ "$services_deployed" != "y" ]; then
    print_warning "Please wait for deployment to complete"
    echo "Check Render dashboard for deployment status"
    exit 1
fi

print_success "Services deployed!"

echo ""
echo "🔍 TESTING CHECKLIST:"
echo "====================="
echo "1. Visit your frontend URL"
echo "2. Test admin login:"
echo "   - Email: admin@example.com"
echo "   - Password: hashedpassword123"
echo "   - Account Type: Admin"
echo "3. Test user registration"
echo "4. Test scholarship application"
echo "5. Check admin panel"
echo ""

read -p "Have you completed testing? (y/n): " testing_complete

if [ "$testing_complete" != "y" ]; then
    print_warning "Please complete testing"
    echo "Visit your frontend URL and test all features"
    exit 1
fi

print_success "Testing completed!"

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
print_success "Your Scholarship Finder app is now live!"
echo ""
echo "📊 SUMMARY:"
echo "==========="
echo "✅ MongoDB Atlas: Connected"
echo "✅ Backend API: Running"
echo "✅ Frontend: Deployed"
echo "✅ Admin Panel: Accessible"
echo "✅ User Features: Working"
echo "✅ Scholarship Application: Functional"
echo ""
echo "🔗 Your URLs:"
echo "============="
echo "Frontend: https://scholarship-finder-frontend.onrender.com"
echo "Backend: https://scholarship-finder-backend.onrender.com"
echo ""
echo "🔑 Admin Login:"
echo "==============="
echo "Email: admin@example.com"
echo "Password: hashedpassword123"
echo ""
print_success "Deployment script completed successfully!" 