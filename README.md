<<<<<<< HEAD

# Full-Stack Authentication System with JWT

This project is a full-stack application that combines both client-side and server-side functionality to create a secure and role-based authentication system using JWT (JSON Web Tokens). The main goal of this project is to provide a robust authentication mechanism that allows users to securely register, login, and access specific resources based on their assigned roles.

## Features

- **JWT Authentication**: Implements JSON Web Tokens for secure authentication and authorization.
- **Role-Based Access Control (RBAC)**: Enables role-based access control to regulate access to specific resources based on user roles.
- **Secure Password Management**: Ensures safe storage of user passwords using industry-standard encryption methods.
- **Protected Routes**: Includes protected routes on the client-side, accessible only to authenticated users with the appropriate roles.
- **Entry from Multiple Devices**: Supports authentication and access from multiple devices simultaneously.
- **Token Reuse Detection**: Implements token reuse detection to enhance security
- **Light/dark mode toggle**

## Technologies Used

### Frontend
- HTML, CSS, JavaScript
- React.js for building the user interface
- React Router for client-side routing
- Axios for making HTTP requests with interceptors for global request and response handling
- ESLint for code linting
- Vite for fast frontend development and building
- Tailwind CSS for rapid UI development and styling
    
### Backend
- Node.js with Express.js for building the server-side application
- MongoDB as the database for storing user information and tokens
- Mongoose for interacting with MongoDB
- JSON Web Tokens (JWT) for authentication and authorization
- ESLint for code linting
    
### Development Tools:
- Docker for containerization
- Docker Compose for defining and running multi-container Docker applications
- Docker Hub for storing and sharing Docker images

## Installation

### Frontend

```bash
cd client\vite-auth-template-project
npm i

```
### Backend

```bash
cd server
npm i
```

## Usage

### Frontend
```bash
npm run dev
```
### Backend

```bash
npm run dev
```

## Docker Hub Setup

### Frontend Docker Image
```bash
docker pull roneli23/react-app:latest
docker run -p 3000:3000 roneli23/react-app
```
### Backend Docker Image
```bash
docker pull roneli23/express-server:latest
docker run -p 8080:8080 roneli23/express-server
```

 
