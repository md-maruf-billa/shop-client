# Mahid Book's (Book shop Application)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [User Registration & Authentication](#user-registration--authentication)
  - [Public Endpoints](#public-endpoints)
  - [Private Routes](#private-routes)

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

---

## Project Overview

The **Mahid Book's Shop Application** is a user-friendly platform designed for seamless book shopping with secure authentication, role-based access, and smooth product management. It features responsive design, error handling, and `Shurjopay` payment integration .

---

## Features

### User Registration & Authentication

- Secure registration and login with hashed passwords.
- Role-based access (`user` by default, admin manually assigned).
- JWT authentication for secure user sessions.
- For registration you need to-
```typescript
    name: string;
    email: string;
    password: string;
```


### Public Endpoints

1. **Home Page:**
  - Fully Responsive and simple , user friendly.
   - Navbar with logo, navigation links, and authentication buttons.
   - Featured book section with daynamic result.
   - Footer with contact and social media links.

2. **All Books Page:**
   - Search books by title, author, or category.
   - Filter options (price range, category, availability, etc.).
   - Dynamic results with product cards.


3. **Book Details Page:**
   - Displays book details with an image.
   - Checkout Form .

4. **About Page:**
   - Information about the shop and mission statement.

### Private Routes

1. **Checkout Page:**
   - Users can place book orders.
   - Order quantity cannot exceed stock.
   - Order form with total price calculation.
   - Integrated **SurjoPay** payment gateway.
   - Order and payment verification systems.

2. **Dashboard (Role-Based):**
   - **Admin:** Manage users, products, and orders.
   - **User:** View orders, manage profile settings also password change with old password verification.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/md-maruf-billa/Book-shop-frontend-router_6
   ```
2. Navigate into the project directory:
   ```sh
   cd Book-shop-frontend-router_6
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```
   You also need to install my book shop backend for running this project. Hare backend link- `https://github.com/md-maruf-billa/Book-Shop-B4A2-server`

---

## Usage

- **Register/Login** to access user-specific functionalities.
- **Browse books** on the Home or All Products page.
- **Filter/Search** to find desired books easily.
- **Buy books** securely using SurjoPay payment gateway.
- **Admin Dashboard** for managing products, orders, and users.

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Shadcn UI
- **Authentication:** JWT, bcrypt.js
- **Payment Gateway:** SurjoPay
- **State Management:** Redux

---

### Happy Coding! 🚀

