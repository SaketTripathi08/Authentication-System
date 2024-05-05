# base
FROM node:18-alpine as BASE_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server source code to the working directory
COPY . .

# for lint
FROM BASE_IMAGE as LINTER

WORKDIR /app

RUN npm run lint


FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app

COPY package*.json ./

COPY --from=BASE_IMAGE /app/dist /app/dist

RUN npm install --only=production

# Expose port 8080 (assuming your server listens on this port)
EXPOSE 8080

# Command to start the server
CMD ["npm", "start"]
