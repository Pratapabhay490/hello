#!/bin/bash

# TeraBooks Player - Quick Deploy Script
# This script helps you deploy to various platforms

echo "🎬 TeraBooks Player - Deployment Helper"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the terabooks-player directory"
    exit 1
fi

echo "Select deployment option:"
echo "1) Deploy to Vercel"
echo "2) Build for production"
echo "3) Push to GitHub"
echo "4) Run locally"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        
        # Check if vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm i -g vercel
        fi
        
        echo "Starting deployment..."
        vercel
        echo "✅ Deployment initiated!"
        ;;
    
    2)
        echo "🏗️  Building for production..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build successful!"
            echo "📦 Production build is in .next directory"
            echo "To start production server: npm start"
        else
            echo "❌ Build failed. Check errors above."
        fi
        ;;
    
    3)
        echo "📤 Pushing to GitHub..."
        
        # Check if git remote exists
        if git remote | grep -q origin; then
            echo "Pushing to existing remote..."
            git push origin main
        else
            echo ""
            echo "⚠️  No git remote configured."
            echo "Please follow these steps:"
            echo ""
            echo "1. Create a new repository on GitHub:"
            echo "   https://github.com/new"
            echo ""
            echo "2. Then run these commands:"
            echo "   git remote add origin https://github.com/YOUR-USERNAME/terabooks-player.git"
            echo "   git push -u origin main"
            echo ""
            echo "📖 See GITHUB_SETUP.md for detailed instructions"
        fi
        ;;
    
    4)
        echo "🖥️  Starting development server..."
        echo "Will be available at http://localhost:3000"
        echo "Press Ctrl+C to stop"
        echo ""
        npm run dev
        ;;
    
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
