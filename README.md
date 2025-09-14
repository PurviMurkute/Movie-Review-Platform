# 🎬 MovieReview – MERN Stack Movie Review Platform  

MovieReview is a full-stack web application built with the **MERN stack** that allows users to browse trending and popular movies, view detailed information (cast, trailer, synopsis), post reviews with ratings, and manage their watchlist and profile.  

---

## 🚀 Features  

- ✅ **Browse Movies:** Fetch trending and popular movies using TMDB API  
- ✅ **Movie Details:** Backdrop, poster, genres, director, cast, trailer, and overview  
- ✅ **User Authentication:** JWT-based login/signup with secure password hashing  
- ✅ **Post Reviews:** Star rating + text reviews, visible on each movie’s page  
- ✅ **Review History:** Display user’s past reviews on their profile  
- ✅ **Watchlist Management:** Add/remove movies to personal watchlist  
- ✅ **Responsive Design:** Optimized for mobile and desktop  
- ✅ **Caching:** Redis caching for movies and reviews to improve performance  

---

## 🛠️ Tech Stack  

**Frontend:** React, React Router, TailwindCSS, React Hot Toast  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), Redis  
**API:** [TMDB API](https://developer.themoviedb.org/) for movie data  
**Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing  
**Deployment:** Vercel (Frontend + Backend)  

---

## 📦 Setup & Installation  

### 1 Clone the Repository  
```bash
git clone https://github.com/your-username/movie-review-platform.git
cd movie-review-platform

### 2 Install Dependencies
### Backend
cd server
npm install

### Frontend
cd client
npm install

### 3 Environment Variables

# Backend Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
REDIS_PORT=redis_port
REDIS_HOST=redis_host
REDIS_PASSWORD=redis_password

# Frontend Environment Variables
VITE_SERVER_URL=http://localhost:5001/api

### 4 Run Apllication
# Server
cd server
npm run dev

# Client
cd client
npm run dev