# Gulf Basket 🧺 (E-Commerce Web Application)

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

**Gulf Basket** is a modern, user-friendly e-commerce platform built for seamless online shopping. The app offers robust user authentication, role-based access control, dynamic product management, and smooth payment integration via **SurjoPay**. It delivers a responsive interface, intuitive navigation, and efficient admin functionalities for managing inventory and orders.

---

## Features

### User Registration & Authentication

- Secure user registration and login using hashed passwords.
- JWT-based authentication for secure session management.
- Role-based access:
  - `user` (default)
  - `admin` (assigned manually via backend or admin dashboard)
- Registration requires the following fields:
```typescript
    name: string;
    email: string;
    password: string;

```

Public Endpoints

    Home Page:

        Fully responsive and modern design.

        Navbar with logo, navigation links, and login/register buttons.

        Featured products section (dynamically loaded).

        Footer with contact info and social media links.

    All Products Page:

        Search products by name, brand, or category.

        Filter options: price range, availability, category.

        Responsive product cards with real-time data.

    Product Details Page:

        Displays detailed product information with image, price, and description.

        Add to Cart and Buy Now options.

        Checkout preview.

    About Page:

        Information about Gulf Basket, its mission, and vision.

Private Routes

    Checkout Page:

        Secure checkout process for placing orders.

        Quantity validation (can't exceed available stock).

        Order summary with total price.

        Integrated SurjoPay payment system.

        Order confirmation & payment verification.

    User Dashboard:

        View past orders.

        Update profile and change password (with old password verification).

    Admin Dashboard:

        Manage all users (promote/demote roles).

        Add, update, or delete products.

        View and manage all orders.

        Monitor payments and system metrics.

Installation
Frontend Setup

    Clone the frontend repository:

git clone https://github.com/md-maruf-billa/Book-shop-frontend-router_6

Navigate into the project directory:

cd Book-shop-frontend-router_6

Install dependencies:

npm install

Start the development server:

    npm run dev

Backend Setup (Required)

You also need to install and run the backend server for full functionality.

    Clone the backend repository:

    git clone https://github.com/md-maruf-billa/Book-Shop-B4A2-server

    Follow the setup instructions in the backend repository's README.

Usage

    Register/Login to unlock user functionalities.

    Browse products and search/filter to find what you need.

    Add items to cart or directly buy using SurjoPay.

    Track orders and update your profile via the user dashboard.

    Admin users can manage everything from a central dashboard.

Technologies Used

    Frontend: React.js, Tailwind CSS, Shadcn UI

    Authentication: JWT, bcrypt.js

    Payment Gateway: SurjoPay

    State Management: Redux

    Routing: React Router v6

    Backend (linked repo): Node.js, Express.js, MongoDB

Contribution

Feel free to fork the project and contribute via pull requests. For major changes, please open an issue first to discuss what you'd like to change.
License

This project is open-source and free to use under the MIT License.