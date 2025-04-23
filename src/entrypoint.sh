#!/bin/bash

# Make sure chroma DB exists
if [ ! -d "/app/data/chroma" ]; then
  echo "▶️  Chroma DB not found — creating from PDF..."
  python backend/create_database.py
else
  echo "✅ Chroma DB already exists — skipping creation."
fi

# Run your backend server
echo "🚀 Starting backend server..."
python backend/backendServer.py
