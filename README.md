markdown
Copy code
# Task Manager

Task Manager is a Node.js application that allows users to manage their tasks. It provides features such as user authentication, task CRUD operations, and real-time updates using WebSockets.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Real-time updates on task status changes using WebSockets
- Secure handling of authentication and authorization
- Clean and efficient database schema design

## Technologies

- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT) for authentication
- WebSocket (socket.io) for real-time communication
- ESLint and Prettier for code linting and formatting

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd task-manager
```
2. Install dependencies:
```
npm install || yarn
```
3. Set up environment variables::
Create a .env file in the root directory and add the following variables:
```
# Server Port Number
PORT=<PORT-NUMBER> # 3000

# Cookie Config
COOKIE_NAME=<COOKIE-NAME> #access_token

# Database Config
DB_HOST=<DB-HOST> #localhost
DB_USER=<DB-USER> #root
DB_PASSWORD=<DB-PASSWORD> #developer
DB_NAME=<DB-NAME> #task_manager

# JWT SECRET (COOKIE)
JWT_SECRET=<JWT-SECRET> #GkJQ3azKcXvOviy
```

## Usage

Start the application:

1. 
```
npm run dev || yarn dev
```
#### OR
```
npm start || yarn start
```
Use API endpoints to interact with the application (refer to the API documentation).

API Endpoints
- User Registration: POST /api/register
- User Login: POST /api/login
- Get All Tasks: GET /api/tasks (Authenticated users only)
- Get Task by ID: GET /api/tasks/:id (Authenticated users only)
- Create Task: POST /api/tasks (Authenticated users only)
- Update Task: PUT /api/tasks/:id (Authenticated users only)
- Delete Task: DELETE /api/tasks/:id (Authenticated users only)

### WebSocket Events
- Task Status Update: WebSocket event taskStatusUpdate notifies users when a task's status is updated.