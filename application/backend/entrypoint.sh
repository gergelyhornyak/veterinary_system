#!/bin/sh
# Generate random JWT_SECRET if not already set
: "${JWT_SECRET:=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 16)}"
: "${REFRESH_TOKEN_SECRET:=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 16)}"

export JWT_SECRET
export REFRESH_TOKEN_SECRET

# Start the app
exec "$@"