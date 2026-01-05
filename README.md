# TaskDone Frontend

TaskDone is a web application for managing projects and tasks.

## Deployment

The application is deployed at: [https://task-done-frontend.vercel.app/](https://task-done-frontend.vercel.app/)

## Technologies

- React 19
- Vite
- Axios
- React Router 7

## API Endpoints

The frontend interacts with the following backend endpoints through the API service:

### Authentication

- POST /auth/register: Registers a new user with username, email, and password.
- POST /auth/login: Authenticates a user and returns access and refresh tokens.

### Projects

- GET /projects: Retrieves the list of projects for the authenticated user.
- POST /projects: Creates a new project with a name and description.
- PUT /projects/{projectId}/activate: Activates a specific project.
- PUT /projects/{projectId}/close: Closes a specific project.
- DELETE /projects/{projectId}: Deletes a specific project.

### Tasks

- GET /projects/{projectId}/tasks: Retrieves all tasks associated with a specific project.
- POST /projects/{projectId}/tasks: Creates a new task within a project.
- PUT /tasks/{taskId}/complete: Marks a specific task as completed.

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
