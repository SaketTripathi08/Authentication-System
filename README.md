
# Authentication Project

This project is a full-stack application that combines both client-side and server-side functionality to create a secure and role-based authentication system using JWT (JSON Web Tokens). The main goal of this project is to provide a robust authentication mechanism that allows users to securely register, login, and access specific resources based on their assigned roles.

## Features

- JWT Authentication: Implements JSON Web Tokens for secure authentication and authorization.
- Role-Based Access Control (RBAC): Enables role-based access control to regulate access to specific resources based on user roles.
- Secure Password Management: Ensures safe storage of user passwords using industry-standard encryption methods.
- Protected Routes: Includes protected routes on the client-side, accessible only to authenticated users with the appropriate roles.
- Light/dark mode toggle






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
roneli23/react-app:latest
docker run -p 3000:3000 roneli23/react-app
```
### Backend Docker Image
```bash
roneli23/express-server:latest
docker run -p 8080:8080 roneli23/express-server
```

## Authors

### 👤 Ron Eli
- Github: [@roneli23](https://github.com/roneli23)
- LinkedIn: [@Ron Eli](https://www.linkedin.com/in/ron-eli-ba47a9226/)

