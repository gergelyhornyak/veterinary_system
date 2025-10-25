docker run --rm \
  -v $(pwd)/nginx/html:/usr/share/nginx/html \
  -v $(pwd)/certs:/etc/letsencrypt \
  certbot/certbot certonly --webroot \
  -w /usr/share/nginx/html \
  -d lajosmizse.com \
  --email you@example.com --agree-tos --no-eff-email

  # docker restart nginx