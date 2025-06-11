# Nexa Quanta – Full Stack Application

This is a full-stack application built with **Next.js (15) + TypeScript** for the frontend and **Node.js + TypeScript** for the backend.

---

## 🚀 Prerequisites

- **Node.js v20 or higher**
- Git

---

## 🔧 Installation Guide

### 1. Clone the Repository


git clone https://github.com/Tayyab971/nexaquant-dashboard.git
cd nexaquant-dashboard

### 2. Go To Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:6432/api
npm install

### 3. Go To Backend
.env

PORT=6432
DATABASE_URL=your_database_connection_url
JWT_SECRET=your_jwt_secret
NODEMAILER_EMAIL=tayyab.ejaz@mqvantage.com
NODEMAILER_EMAIL_PASSWORD="txujyskypwytmldv"
npm install

### 3. How Simmulization is working.
The summary generation simulates AI behavior by introducing a 3-second delay and randomly selecting from a list of predefined summaries.
One of the summaries includes the first 30 words of the document's description to mimic a context-aware result.

