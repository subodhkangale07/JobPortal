# JobHunt

A full-stack job portal application built using React.js, Vite, Express.js, Node.js, and MongoDB. The platform allows recruiters to post jobs, and students to apply for jobs and search for opportunities based on their skills and interests.

Table of Contents
Project Setup
Features
Tech Stack
Installation
Scripts
Contributing
License
Project Setup

This project uses Vite for fast builds and HMR (Hot Module Replacement) in development, along with React for the frontend.

There are two available plugins:

@vitejs/plugin-react: Uses Babel for Fast Refresh.

@vitejs/plugin-react-swc: Uses SWC for Fast Refresh.

You can choose either plugin based on your project needs. This project uses @vitejs/plugin-react by default.

# Features

Student Login/Signup: Allows students to create an account and log in to the platform.

Recruiter Login/Signup: Allows recruiters to create an account and log in to post jobs.

Job Posting: Recruiters can post new job opportunities with details such as job title, description, location, and required skills.

Job Search: Students can search and filter jobs based on specific criteria like skills, location, and company.

Job Application: Students can apply for jobs directly through the portal.

Responsive Design: Mobile-friendly UI with easy navigation and clear layout for both recruiters and students.


# Tech Stack

Frontend: React.js, Vite

Backend: Node.js, Express.js

Database: MongoDB

Styling: Tailwind CSS, CSS Modules

Authentication: JWT (JSON Web Token)

Version Control: Git, GitHub


Installation

To run this project locally, follow these steps:


Clone the repository:


bash

git clone https://github.com/yourusername/jobHunt.git

cd jobHunt

Install the dependencies for both the client and server:


# Install frontend dependencies

cd client

npm install


# Install backend dependencies

cd ../server

npm install

Set up environment variables:


Create a .env file in the server directory with the following:

env

MONGO_URI=<your-mongodb-connection-string>

JWT_SECRET=<your-jwt-secret-key>

Start the development server:


bash

# In the root directory, start the backend server

cd server

npm run dev


# In the client directory, start the frontend server
cd ../client

npm run dev


The app will be running at:

Frontend: http://localhost:5173/

Backend: http://localhost:5000/

Scripts

In the client and server directories, the following scripts are available:

Client

npm run dev: Start the development server with Vite.

npm run build: Build the production-ready frontend.

npm run preview: Preview the production build locally.


Server

npm run dev: Start the backend server in development mode.

npm start: Start the backend server in production mode.



Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to discuss potential changes.


License

This project is licensed under the MIT License.

