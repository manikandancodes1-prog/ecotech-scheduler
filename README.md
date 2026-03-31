# 🚀 EcoTech Scheduler  
### MERN Stack Appointment Scheduling Platform

> A full-stack, production-ready scheduling application inspired by Calendly — built for the **4N EcoTech Technical Assessment**.

---

## 🌐 Live Demo

🔗 **Frontend:** https://ecotech-scheduler.vercel.app  
🔗 **Backend API:** https://ecotech-backend-t1mq.onrender.com  

---

## 📌 Project Overview

EcoTech Scheduler is a modern appointment booking platform that eliminates manual scheduling and prevents conflicts.

Users can:
- Set availability
- Share booking links
- Accept appointments seamlessly

Built with scalability, security, and performance in mind.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Password encryption using bcrypt
- Protected API routes

### 📅 Smart Scheduling
- Dynamic availability setup
- Auto slot generation (30 mins)
- Time-based filtering

### 🚫 Conflict Prevention
- Real-time slot validation
- Zero double-booking logic

### 📊 Dashboard
- View all upcoming bookings
- Real-time updates

### 📱 Responsive UI
- Mobile-friendly design
- Clean modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js (Hooks)
- Tailwind CSS
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- REST API Architecture

### Database
- MongoDB Atlas
- Mongoose ODM

### Security & Tools
- JSON Web Token (JWT)
- bcrypt
- dotenv
- Git & GitHub

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

bash

git clone https://github.com/manikandancodes1-prog/ecotech-scheduler.git

cd ecotech-scheduler

---------------------------------------------------------------------------------------------------

2️⃣ Backend Setup

cd server

npm install

---------------------------------------------------------------------------------------------------

Create .env file:

MONGO_URI= ******

JWT_SECRET= *****123

---------------------------------------------------------------------------------------------------

Run server:

npm run dev

---------------------------------------------------------------------------------------------------

3️⃣ Frontend Setup

cd client

npm install

npm start

---------------------------------------------------------------------------------------------------

🧠 Core Logic Highlight

🔥 Slot Generation Algorithm
  - Converts availability into 30-min intervals
  - Filters booked slots dynamically
  - Ensures only available slots are shown

---------------------------------------------------------------------------------------------------

🛡️ Security Practices

  - Environment variables secured via .env
  - Password hashing with bcrypt
  - JWT-based route protection
  - CORS configured

---------------------------------------------------------------------------------------------------

🚀 Future Enhancements

  - 📧 Email Notifications (Nodemailer)
  - 📅 Google Calendar Integration
  - 🎥 Meeting Link (Zoom/Meet)
  - 🌍 Multi-language Support
  - 📊 Analytics Dashboard

---------------------------------------------------------------------------------------------------

📸 Demo

🎥 Demo Video: https://drive.google.com/file/d/1W-CMRMhUWcQsMMWcD6PcrT9eFyWtpaZJ/view?usp=sharing

---------------------------------------------------------------------------------------------------

👨‍💻 Author

Manikandan S

📧 manikandancodes1@gmail.com

🔗 https://github.com/manikandancodes1-prog

