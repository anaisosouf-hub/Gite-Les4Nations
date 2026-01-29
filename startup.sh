#!/bin/bash
cp /home/site/wwwroot/nginx.conf /etc/nginx/sites-available/default
nginx -g 'daemon off;'
