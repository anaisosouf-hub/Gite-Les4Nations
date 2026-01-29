#!/bin/bash
# Copy website files to nginx html directory
cp -r /home/site/wwwroot/*.html /usr/share/nginx/html/
cp -r /home/site/wwwroot/css /usr/share/nginx/html/
cp -r /home/site/wwwroot/images /usr/share/nginx/html/
cp /home/site/wwwroot/*.txt /usr/share/nginx/html/
cp /home/site/wwwroot/*.xml /usr/share/nginx/html/
cp /home/site/wwwroot/*.png /usr/share/nginx/html/ 2>/dev/null || true

# Start nginx
nginx -g 'daemon off;'
