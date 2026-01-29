#!/bin/bash

# Exit on error
set -e

echo "Copying files to nginx html directory..."

# Create directory if it doesn't exist
mkdir -p /usr/share/nginx/html

# Copy all website files to nginx directory
cp -r /home/site/wwwroot/*.html /usr/share/nginx/html/ 2>/dev/null || true
cp -r /home/site/wwwroot/css /usr/share/nginx/html/ 2>/dev/null || true
cp -r /home/site/wwwroot/images /usr/share/nginx/html/ 2>/dev/null || true
cp -r /home/site/wwwroot/*.txt /usr/share/nginx/html/ 2>/dev/null || true
cp -r /home/site/wwwroot/*.xml /usr/share/nginx/html/ 2>/dev/null || true
cp -r /home/site/wwwroot/*.png /usr/share/nginx/html/ 2>/dev/null || true

echo "Files copied successfully!"

# Reload nginx
killall -HUP nginx 2>/dev/null || true

echo "Deployment complete!"
