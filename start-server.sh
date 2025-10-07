#!/bin/bash

# AI Summit Website Server Startup Script
echo "Starting AI Summit website server..."
echo "Server will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the Python HTTP server
python3 -m http.server 8000
