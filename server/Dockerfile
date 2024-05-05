# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server source code to the working directory
COPY . .

# Expose port 8080 (assuming your server listens on this port)
EXPOSE 8080

# Command to start the server
CMD ["npm", "start"]
