# Clothing E-Commerce Backend API (Major Project 1 BackEnd)

A RESTful backend API for a clothing e-commerce application. Built with **Node.js**, **Express 5**, and **MongoDB**, this API provides complete CRUD operations for managing products, categories, user addresses, wishlists, shopping carts, and orders.

---

## Tech Stack

| Technology  | Description                        |
|-------------|------------------------------------|
| Node.js     | JavaScript runtime                 |
| Express 5   | Web application framework          |
| MongoDB     | NoSQL database                     |
| Mongoose 9  | ODM for MongoDB                    |
| dotenv      | Environment variable management    |
| CORS        | Cross-Origin Resource Sharing      |

---

## Features

- **Products** — Create, fetch, and browse clothing items with pricing, ratings, images, and categories.
- **Categories** — Organise products into categories.
- **Addresses** — Manage user shipping addresses with full address details.
- **Wishlist** — Add and fetch wishlisted products for any user.
- **Cart** — Maintain a shopping cart with product quantities.
- **Orders** — Place orders with items, total amount, and shipping address.... cart is cleared upon order placement.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [MongoDB](https://www.mongodb.com/) instance (local or [Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clothing-ecommerce-app---backend
2. Install dependencies:
npm install
3. Create a .env file in the project root and add your MongoDB connection string:
mongoDB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=<appName>
4. Start the server:
node index.js

## API Reference

### Addresses

| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| POST   | `/api/addresses`            | Create a new address |
| POST   | `/api/addresses/:addressId` | Update an address    |
| DELETE | `/api/remove/addresses`     | Delete an address    |
| GET    | `/api/fetch/addresses`      | Fetch all addresses  |

### Clothing

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| POST   | `/api/Clothing`            | Add a new clothing product     |
| GET    | `/api/fetch/Clothing`      | Fetch all clothing products    |
| GET    | `/api/Clothing/:clothingId` | Fetch a single clothing product |

### Categories

| Method | Endpoint                | Description          |
|--------|-------------------------|----------------------|
| POST   | `/api/categories`       | Add a new category   |
| GET    | `/api/fetch/categories` | Fetch all categories |

### Wishlist

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | `/api/wishlist`       | Update a user's wishlist      |
| GET    | `/api/fetch/wishlist` | Fetch wishlist (`?userId=`)   |

### Cart

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/api/cart`         | Update a user's cart         |
| GET    | `/api/fetch/cart`   | Fetch cart (`?userId=`)      |

### Orders

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/api/orders`        | Place an order    |
| GET    | `/api/fetch/orders`  | Fetch all orders  |
