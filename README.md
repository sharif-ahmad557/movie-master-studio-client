# 🎬 MoviePortal - Ultimate Movie Management Platform
![Screenshot](https://i.postimg.cc/kGPJd3Y9/Screenshot-3.png)

**MoviePortal** is a feature-rich, full-stack web application designed for movie enthusiasts. It allows users to explore movies, manage their personal collections, create watchlists, and view dynamic statistics via an interactive dashboard. The application features a modern, responsive UI with seamless Dark/Light mode integration.
🔗 **Live Website:** [https://movie-master-studio-client-jatb.vercel.app/]  
📂 **Server Repository:** [https://github.com/sharif-ahmad557/movie-master-studio-server]

## 🚀 Key Features

### 🎨 User Interface & Experience
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop devices.
- **Theme Customization:** Toggle between **Dark** and **Light** modes with persistent settings.
- **Modern UI:** Built with **Tailwind CSS** and **DaisyUI** for a clean, professional look.
- **Animations:** Smooth transitions using `animate.css` and `framer-motion`.

### 🔐 Authentication & Security
- **Secure Login:** Email/Password login and **Google Social Login** via Firebase.
- **Protected Routes:** Private pages (Dashboard, My Collection) are inaccessible without login.
- **JWT / Secure API:** Backend endpoints verified for secure data access.

### 📊 Dashboard & Management
- **Dynamic Dashboard:** Visual data representation using **Recharts** (Bar Chart for genres).
- **CRUD Operations:**
  - **Add:** Users can add new movies with live poster preview.
  - **Update:** Edit movie details (Owner/Admin only).
  - **Delete:** Remove movies from the database (Owner/Admin only).
- **My Collection:** Personalized view of movies added by the logged-in user.
- **Watchlist:** Real-time Add/Remove functionality for favorite movies.

### 🔍 Explore & Search
- **Advanced Search:** Real-time search by movie title.
- **Filtering & Sorting:** Filter by **Genre** and sort by **Rating** or **Release Year**.
- **Related Movies:** Smart suggestions based on movie genres on the details page.

---

## 🛠️ Technology Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS & DaisyUI
- Firebase Authentication
- Recharts (for Data Visualization)
- React Hot Toast (for Notifications)
- Swiper.js (for Sliders)

**Backend:**
- Node.js
- Express.js
- MongoDB (Database)
- Dotenv

---

## 🔑 Demo Credentials

Test the application features using these credentials:

| Role  | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@movie.com` | `Admin123!` | Full Access (Delete any movie) |
| **User** | `user@movie.com` | `User123!` | Standard Access (Manage own data) |

> **Note:** You can use the **"Demo Admin"** or **"Demo User"** buttons on the login page to auto-fill these credentials.

---
## 📦 How to Run Locally

Follow these steps to run the project on your local machine:

**1. Clone the Repository**
   ```
   git clone https://github.com/sharif-ahmad557/movie-master-studio-client.git
```

**2. Navigate to Project Directory**
```
   cd movie-master-studio-client
```

**3. Install Dependencies**
```
   npm install
```
**4. Set Up Environment Variables**
Create a `.env.local` file in the root directory and add your Firebase keys:
```
VITE_apiKey=YOUR_API_KEY
VITE_authDomain=YOUR_AUTH_DOMAIN
VITE_projectId=YOUR_PROJECT_ID
VITE_storageBucket=YOUR_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
VITE_appId=YOUR_APP_ID
```
**5. Run the Application**
```
  npm run dev

```
---

<p align="center">
  Developed with ❤️ by <b>Sharif Ahmad</b>
  <br>
  <a href="https://www.linkedin.com/in/shariful-islam-mern/" target="_blank">Connect on LinkedIn</a>
</p>
