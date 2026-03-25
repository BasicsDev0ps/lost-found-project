#!/bin/bash
# Quick Start Guide for Campus Lost & Found Portal

echo "======================================"
echo "Campus Lost & Found Portal - Quick Start"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to backend
echo "📦 Installing backend dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update the MongoDB URI in backend/.env"
fi

cd ..
echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "📌 Next Steps:"
echo ""
echo "1. Update MongoDB Connection:"
echo "   - Edit backend/.env"
echo "   - Set MONGODB_URI to your MongoDB connection string"
echo ""
echo "2. Start Backend Server:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "3. Open Frontend in Browser:"
echo "   - Using Python: python -m http.server 8000 (in frontend folder)"
echo "   - Using Live Server: Open frontend/index.html in VS Code with Live Server"
echo "   - Direct: file:///.../frontend/index.html"
echo ""
echo "4. Access the application:"
echo "   http://localhost:8000 or file path to index.html"
echo ""
echo "======================================"
