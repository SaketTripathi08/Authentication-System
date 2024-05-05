# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code to the working directory
COPY . .

# Create a production build of our application
RUN npm run build

# Expose port 3000 
EXPOSE 3000

# Command to start the server
CMD [ "npm", "run", "preview" ]
