#!/bin/bash

# Make sure chroma DB exists
if [ ! -d "/app/data/chroma" ]; then
  echo "▶️  Chroma DB not found — creating from PDF..."
  cd backend
  python create_database.py
  cd ..
else
  echo "✅ Chroma DB already exists — skipping creation."
fi

# Run your backend server
echo "🚀 Starting backend server..."
cd backend
python backendServer.py
