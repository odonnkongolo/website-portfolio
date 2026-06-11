#!/bin/bash
echo "Starting Odon's Portfolio Website..."
cd "$(dirname "$0")"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm could not be found. Please ensure Node.js is installed."
    exit 1
fi

echo "Installing dependencies (if needed)..."
npm install

echo "Starting development server..."
echo "You can close this window to stop the server."
npm run dev
