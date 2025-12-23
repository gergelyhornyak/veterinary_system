#!/bin/bash

#sudo docker compose down -v && yes | sudo docker volume prune && sudo docker volume ls && sudo docker ps -a && sudo docker compose build && sudo docker compose up

# Clear the screen and show a header
clear
echo "====================================="
echo " Docker Compose Interactive Runner"
echo "====================================="
echo ""
echo "Press 'Q' at any time to stop containers and exit."
echo ""

# Function to stop docker gracefully
stop_docker() {
    echo ""
    echo "Stopping Docker Compose..."
    sudo docker compose down
    echo "All containers stopped. Exiting."
    exit 0
}

# Build and start docker compose in detached mode
echo "Building containers..."
sudo docker compose down >/dev/null 2>&1
sudo docker compose build

echo "Starting containers..."
sudo docker compose up &

# Capture the PID of the docker compose process
DOCKER_PID=$!

printf "\nOpening application in web browser...\n"

sleep 8  # Wait a bit for services to start

xdg-open http://localhost:3001

# Non-blocking input loop to detect 'q' or 'Q'
while kill -0 $DOCKER_PID 2>/dev/null; do
    read -t 1 -n 1 key
    if [[ $key == "q" || $key == "Q" ]]; then
        stop_docker
    fi
done

# When docker-compose process ends naturally
stop_docker
exit 0
