# Medicine Availability Finder

This is a MERN stack application to help users find medicines in nearby pharmacies.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: You need to have MongoDB installed and running locally, or update the `MONGODB_URI` in `backend/.env` to point to a MongoDB Atlas cluster.

## How to Run the Backend

1. Open a terminal and navigate to the `backend` directory:
   ```cmd
   cd backend
   ```
2. (Optional) If dependencies are not installed, run:
   ```cmd
   npm install
   ```
3. Start the backend server:
   ```cmd
   node server.js
   ```
   *You should see a message saying "Connected to MongoDB" and "Server running on port 5000" if your database is running correctly.*

## How to Run the Frontend

1. Open a **new** terminal window/tab and navigate to the `frontend` directory:
   ```cmd
   cd frontend
   ```
2. (Optional) If dependencies are not installed, run:
   ```cmd
   npm install
   ```
3. Start the Vite development server:
   ```cmd
   npm run dev
   ```
4. Follow the link provided in the terminal (usually `http://localhost:5173`) to open the app in your browser!
