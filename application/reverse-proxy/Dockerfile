# Use the official Nginx image as base
FROM nginx:1.28-alpine

# Remove the default config if it exists
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration into the container
COPY default.conf /etc/nginx/conf.d/default.conf
#COPY ssl/selfsigned.crt /etc/nginx/ssl/selfsigned.crt
#COPY ssl/selfsigned.key /etc/nginx/ssl/selfsigned.key

# Expose port 80 for HTTP traffic
EXPOSE 80
