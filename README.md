# Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application. The system allows an admin to manage employee records and track employee attendance efficiently through a clean and intuitive user interface.

The application demonstrates complete end-to-end development including frontend UI, backend API development, database integration, validations, and production deployment.

This project simulates a basic internal HR tool used in organizations for maintaining employee details and daily attendance tracking.

# Features
## Employee Management

### Add new employees

### View employee list

### Delete employees

### Server-side validation:

  #### Required fields

  #### Valid email format

  #### Duplicate employee ID prevention

## Attendance Management

### Mark attendance for employees

### Track attendance by date

### View attendance records

### Filter attendance by:

  #### Employee

  #### Date

  #### Employee + Date

## Dashboard (Bonus Feature)

### Total employees count

### Total attendance records

### Total present days summary per employee

## UI Features

### Professional Tailwind CSS styling

### Responsive layout

### Reusable components

### Loading and error handling states

### Multi-page navigation

## Tech Stack Used
1.) Frontend

2.) React.js

3.) Axios

4.) React Router DOM

5.) Tailwind CSS

6.) Backend

7.) FastAPI (API Layer)

8.) Django (ORM & Database Models)

## Database

1.) PostgreSQL

2.) Railway Cloud Database (Production)

## Deployment

1.) Backend → Render

2.) Frontend → Netlify

3.) Database → Railway

## Live Application
- Frontend
https://eclectic-medovik-d9f3dc.netlify.app/

- Backend API

 https://hrms-backend-afbb.onrender.com/docs


## Project Structure
hrms-lite
│
├── backend
│   ├── core
│   │   ├── core
│   │   ├── hrms
│   │   └── manage.py
│   ├── api.py
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md

## Steps To Run The Project Locally

### Prerequisites

Make sure you have installed:

Python 3.11+

Node.js 18+

PostgreSQL

Git

###  Backend Setup
Step 1 – Clone Repository
git clone <YOUR_REPO_URL>
cd hrms-lite

Step 2 – Setup Virtual Environment
cd backend
python -m venv venv

Step 3 – Activate Virtual Environment
Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

Step 4 – Install Backend Dependencies
pip install -r requirements.txt

Step 5 – Setup PostgreSQL Database

Create database:

hrms_db

Step 6 – Create .env File

Inside backend folder:

backend/.env


Add:

DATABASE_URL=postgresql://postgres:password@localhost:5432/hrms_db

Step 7 – Run Migrations
cd core
python manage.py migrate

Step 8 – Start Backend Server
cd ..
uvicorn api:app --reload


Backend runs at:

http://127.0.0.1:8000/docs

### Frontend Setup
Step 1 – Navigate to Frontend
cd frontend

Step 2 – Install Dependencies
npm install

Step 3 – Setup Environment Variables

Create:

.env.development


Add:

REACT_APP_API_URL=http://127.0.0.1:8000

Step 4 – Run Frontend
npm start


Frontend runs at:

http://localhost:3000

