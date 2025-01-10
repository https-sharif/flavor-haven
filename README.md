# Flavor Haven

## Project Overview

**Flavor Haven** is a luxurious restaurant website designed to provide a seamless and delightful user experience. The platform allows users to:  
- Browse the menu with descriptions, prices, and images.  
- Book reservations conveniently.  
- Track orders and reservations in real time.  
- Manage their cart.  
- Learn about the restaurant and its story through the **About Us** page.  
- Contact the restaurant via the **Contact Us** page.  
- Access policies and terms of service for a professional, real-world experience.
- **Login with Google or Facebook** for a simplified authentication process.    

The website is fully responsive, ensuring a smooth and optimized experience on all screen sizes and devices, from desktops to mobile phones.

Administrators can efficiently manage order statuses (e.g., pending, preparing, ready, delivered, or canceled) and reservation statuses (e.g., pending, confirmed, or canceled).  

With an elegant design featuring animations, tooltips, and a sophisticated gold, black, and white color scheme, **Flavor Haven** aims to digitally elevate the dining experience.

---

## Objectives

- Provide a user-friendly interface for seamless menu browsing and reservation booking.  
- Enable real-time tracking of orders and reservations for users.  
- Offer efficient management tools for administrators to handle orders and reservations.  
- Include essential pages like **About Us**, **Contact Us**, and **Policy & Terms of Service** to imitate a real-life website.  
- Incorporate social login via **Google** and **Facebook** for easier authentication.
- Include additional pages like Access Denied, Please Login, and Confirmation Pages for better user flow.
- Ensure full responsiveness for compatibility across all screen sizes and devices.
- Incorporate a luxurious design aesthetic to reflect the brand's premium quality.  
- Implement advanced features like animations and tooltips for enhanced usability.  

---

## Tools and Technologies

### **Frontend**
- React, TypeScript, Zustand (state management)  
- Lucide & MynaUI (icons)  

### **Backend**
- Node.js, Express  

### **Database**
- MongoDB  

### **Deployment**
- **Frontend:** Vercel  
- **Backend:** Render  

### **Authentication**
- Firebase (Email/Password, Google, and Facebook OAuth)   

### **Validation & Testing**
- Zod (schema validation)  
- ThunderClient, Jest (testing)  

---

## Features

### **Core Functionality**
- **Menu Browsing:** Users can view a detailed menu with descriptions, prices, and images.  
- **Reservation Booking:** Simplified process for users to book tables at their convenience.  
- **Order Tracking:** Real-time updates on order statuses, from pending to delivery.  
- **Reservation Tracking:** Monitor the status of reservations (e.g., pending, confirmed, canceled).  
- **Cart Management:** Users can add, remove, and edit items in their cart.  
- **Social Login:** Users can log in via **Google** or **Facebook** for quick authentication. 
- **About Us:** Learn about the restaurant's story, values, and mission.  
- **Contact Us:** Get in touch with the restaurant via email, phone, or an embedded map.  
- **Policy & Terms of Service:** Professional-grade pages outlining user policies and terms.  

### **Administrative Features**
- **Order Status Management:** Admins can update the status of orders.  
- **Reservation Status Management:** Admins can manage reservation statuses.  

### **Additional Features**
- **Access Denied Page:** Displays a clear message if a non-admin user tries to access the admin panel.
- **Please Login Page:** Redirects users attempting to perform actions requiring authentication.
- **Confirmation Pages:** Includes order and reservation confirmation pages with options to navigate directly to their respective tracking pages.

---

## Design Documentation

### **Wireframes**
Wireframes detailing the user interface design are available [here](https://excalidraw.com/#json=7F40hkN0LspqE5e8aObQ6,tjCa7W9FXlMLB9OcCollfQ). 

![Wireframes](/screenshots/Final%20Wireframe.excalidraw.svg)

### **Database Schema**

![Database Schema](/screenshots/database_schema.png)

---

## Setup Instructions

### **Prerequisites**
#### Software Requirements:
- Node.js (v14 or later)  
- MongoDB (local or cloud instance)  
- Git  
- A modern web browser  

#### Hardware Requirements:
- A computer with at least 8GB of RAM.  
- Stable internet connection.  

---

### **Steps**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/https-sharif/flavor-haven.git
   cd flavor-haven
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in both the frontend and backend directories.
   - Add the variables as specified in the [Environment Variables Guide](#environment-variables-guide).

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

5. **Run the Backend Server:**
   Navigate to the backend directory and start the server:  
   ```bash
   node server.js
   ```

6. **Access the Application:**  
   Open `http://localhost:5173` in your browser.

---

## Folder Structure

The project structure is as follows:

```plaintext
flavor-haven/
├── frontend/                  # Frontend code (React, TypeScript)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── animations/        # Animation files and configurations
│   │   ├── assets/            # Images, fonts, and other assets
│   │   ├── components/        # Reusable UI components
│   │   ├── libs/              # Utility libraries and helper functions
│   │   ├── pages/             # Page components
│   │   ├── store/             # State management (e.g., Zustand)
│   │   ├── types/             # TypeScript type definitions
│   │   └── App.tsx            # Main app entry point
│   └── .env                   # Frontend environment variables
├── backend/                   # Backend code (Node.js, Express)
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── server.js              # Backend server entry point
│   └── .env                   # Backend environment variables
├── API_Documentation.md       # Detailed API documentation
├── .gitignore                 # Ignored files and directories
├── README.md                  # Project documentation
└── LICENSE                    # Project license
```

## API Documentation  

The complete API documentation for **Flavor Haven** is available [here](/API_Documentation.md).

## Deployment Instructions

### **Frontend Deployment to Vercel**
1. Log in to your Vercel account.  
2. Import the repository and configure the project settings.  
3. Add required environment variables in the project dashboard.  
4. Deploy the frontend application.  

### **Backend Deployment to Render**
1. Log in to your Render account.  
2. Create a new web service and connect the backend repository.  
3. Add required environment variables in the Render dashboard.  
4. Deploy the backend application.  

### **Final Steps**
- Ensure both the frontend and backend are linked.  
- Test the application in a live environment to confirm functionality.  

---

## Environment Variables Guide

### **Backend `.env` File**
```plaintext
MONGODB_URI=<Your MongoDB connection string>
PORT=<Backend server port>
CLIENT_ID=<Google OAuth client ID>
CLIENT_SECRET=<Google OAuth client secret>
DB_NAME=<Database name>
```

### **Frontend `.env` File**
```plaintext
VITE_FIREBASE_API_KEY=<Firebase API key>
VITE_FIREBASE_AUTH_DOMAIN=<Firebase auth domain>
VITE_FIREBASE_PROJECT_ID=<Firebase project ID>
VITE_FIREBASE_STORAGE_BUCKET=<Firebase storage bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Firebase messaging sender ID>
VITE_FIREBASE_APP_ID=<Firebase app ID>
VITE_FIREBASE_MEASUREMENT_ID=<Firebase measurement ID>
VITE_BACKEND_URL=<Backend URL>
```

---

## Live Deployment

The application is live and accessible at the following URLs:

- **Frontend:** [Flavor Haven Frontend](https://flavor-haven.vercel.app)  
- **Backend:** [Flavor Haven Backend](https://flavor-haven.onrender.com)  

---

## Screenshots

### **Homepage**
![Homepage Screenshot](/screenshots/home.png)  

### **Login Page**
![Login Screenshot](/screenshots/login.png)

### **Menu Page**
![Menu Screenshot](/screenshots/menu.png)  

### **Reservation Page**
![Reservation Screenshot](/screenshots/reservation.png)  

### **Order Tracking**
![Order Tracking Screenshot](/screenshots/track-order.png)  

### **Admin Dashboard**
![Admin Dashboard Screenshot](/screenshots/admin.png)

---

## Testing

### **Unit Testing:**
- Implemented using **Jest** for frontend and backend functions.  

### **API Testing:**
- Conducted using **ThunderClient** for verifying API endpoints.  

---

## Contribution Guidelines

We welcome contributions! To contribute:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit changes: `git commit -m "Add feature-name"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Open a pull request for review.  

---

## License

This project is licensed under the **MIT License**. See the [`LICENSE`](/LICENSE) file for details.

---

## Acknowledgments

- This project was developed as part of a university coursework assignment.  
- Special thanks to the **Flavor Haven** team for their creative input and collaboration.  
- Built with a passion for great food and user experiences.