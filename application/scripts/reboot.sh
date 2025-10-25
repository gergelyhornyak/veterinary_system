#!/bin/bash

# Check if an argument was provided
if [ -z "$1" ]; then
  echo "Usage: (ba)sh reboot.sh <service_name>"
  exit 1
fi

SERVICE="$1"

echo "Rebooting docker service: $SERVICE"
sudo docker compose build "$SERVICE" --pull=false && sudo docker compose up -d "$SERVICE"