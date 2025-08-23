💰 Money Manager – Income & Expense Tracker

A full-stack Income & Expense Tracker that helps users manage their finances with ease. The app supports authentication, category-wise tracking, emoji-based categories, profile management, interactive charts, and real-time notifications.

This project is built with React.js (frontend) and Spring Boot (backend), ensuring seamless performance and scalability.

🚀 Features

✔️ User Authentication – Register & Login with JWT Authentication
✔️ Profile Management – Upload profile picture to Cloudinary
✔️ Income & Expense Tracking – Add, edit, delete with input validation
✔️ Emoji Picker – Fun and intuitive category selection
✔️ Category Management – Create and manage categories easily
✔️ Interactive Dashboard – View insights with React Charts
✔️ Filter Transactions – Filter by date, category, and type
✔️ Excel Export + Email Reports – Download transactions & receive via email
✔️ Daily Email Reminders – Automated financial summaries
✔️ Real-time Notifications – Using React Hot Toast

🛠 Tech Stack
Frontend (moneymanager-frontend)

React.js ⚛️

Tailwind CSS 🎨

Axios 🌐

Lucide React (icons)

React Hot Toast (notifications)

Emoji Picker 😀

React Charts 📊

Backend (moneymanager-backend)

Spring Boot 🚀

Spring Data JPA

Spring Security (JWT Authentication 🔐)

MySQL 🗄️

Email API Integration ✉️

📂 Folder Structure
money-manager/
│── moneymanager-frontend/   # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # React components & pages
│   └── package.json
│
│── moneymanager-backend/    # Spring Boot backend
│   ├── src/main/java/...    # Java source files
│   ├── src/main/resources/  # Application properties
│   └── pom.xml
│
└── README.md

🔧 Setup Instructions
1. Clone the repository
git clone https://github.com/eigen04/money-manager.git
cd money-manager

2. Backend Setup (Spring Boot)

Open moneymanager-backend in your IDE (Eclipse/IntelliJ).

Configure application.properties with your MySQL credentials.

Run the Spring Boot application.

3. Frontend Setup (React.js)
cd moneymanager-frontend
npm install
npm start

4. Access the App

Frontend: http://localhost:3000
Backend: http://localhost:8080

📊 Project Workflow

User registers/login → JWT token issued

User uploads profile picture → Stored on Cloudinary

Add income/expense with emoji category → Data saved in MySQL via Spring Boot API

Dashboard & charts show financial insights

Export transactions as Excel or email reports

🎯 Learning Outcomes

Full-stack development with React + Spring Boot

Authentication & Authorization using JWT

Integration with Cloudinary & Email APIs

Writing clean, modular code for real-world projects

👨‍💻 Author

Anant Agarwal
📌 Passionate Java & Full-Stack Developer
📌 Skilled in React.js, Spring Boot, MySQL, REST API
