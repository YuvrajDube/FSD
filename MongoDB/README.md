# MongoDB CRUD Project

A simple Express and MongoDB CRUD app for managing students from both API and browser UI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file from `.env.example`.
3. Start MongoDB locally or update `MONGODB_URI` for your cluster.
4. Run the app:
   ```bash
   npm start
   ```

5. Open the browser UI at `http://localhost:3000`.

## API Endpoints

- `GET /api/students` - list all students
- `GET /api/students/:id` - get one student
- `POST /api/students` - create student
- `PUT /api/students/:id` - update student
- `DELETE /api/students/:id` - delete student

## UI

The root page is a single-screen dashboard with:

- a student form for create and update
- an interactive list with edit and delete buttons
- automatic refresh after each change

## Example body

```json
{
  "name": "Aarav",
  "email": "aarav@example.com",
  "age": 20,
  "course": "Computer Science"
}
```
