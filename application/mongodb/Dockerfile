# Use the official MongoDB image as base
#FROM mongo:7.0-jammy
FROM mongo:8.0-noble

# Set environment variables for root user and database
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=rootpass
ENV MONGO_INITDB_DATABASE=appdb

# Copy initialization scripts into the container
# Any .js or .sh file in /docker-entrypoint-initdb.d/ is executed at first startup
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose default MongoDB port
EXPOSE 27017

ENV TZ="Europe/Budapest"

# Start MongoDB (default CMD of base image)
CMD ["mongod"]

# sudo docker exec -it mongodb bash
# mongosh -u root -p rootpass
# use appdb
# show collections
# db.COLLECTION.find()
