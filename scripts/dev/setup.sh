#!/bin/bash

# Portfolio Development Setup Script

echo "🚀 Setting up Portfolio Development Environment..."
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version check passed"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Setup backend environment
echo "🔧 Setting up backend environment..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from example"
else
    echo "ℹ️  backend/.env already exists"
fi
echo ""

# Create placeholder directories if needed
echo "📁 Creating placeholder directories..."
mkdir -p frontend/web-portfolio/public
mkdir -p backend/logs
mkdir -p iot/data
mkdir -p automation/logs
echo "✅ Directories created"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit backend/.env with your configuration"
echo "  2. Start backend:  npm run dev:backend"
echo "  3. Start frontend: npm run dev:frontend"
echo ""
echo "  Frontend will be available at: http://localhost:3000"
echo "  Backend API will be available at: http://localhost:5000/api/v1"
echo ""
echo "Happy coding! 🎉"
