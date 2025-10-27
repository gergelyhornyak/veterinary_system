# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --verbose
RUN npm install jspdf html2canvas --verbose
RUN npm install react-textarea-autosize --verbose
RUN npm install react-chartjs-2 react-datepicker date-fns --verbose
RUN npm install chart.js --verbose

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# Start Next.js server
EXPOSE 3001
# npx next telemetry disable
CMD ["npm", "run", "dev"]
#CMD ["npm", "run", "start"]
