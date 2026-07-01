# 🥬 FarmStand

A simple CRUD web application built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, and **EJS**.

This project demonstrates the fundamentals of building a RESTful application with server-side rendering and MongoDB.

---

## Features

- View all products
- Add a new product
- Edit existing products
- Delete products
- Filter products by category
- Server-side rendered pages using EJS
- MongoDB database with Mongoose

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Method Override

---

## Project Structure

```
FarmStand/
│
├── models/
│   └── product.js
│
├── views/
│   └── products/
│       ├── index.ejs
│       ├── show.ejs
│       ├── new.ejs
│       └── edit.ejs
│
├── seeds.js
├── index.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/farmstand.git
```

Move into the project:

```bash
cd farmstand
```

Install dependencies:

```bash
npm install
```

Make sure MongoDB is running locally.

---

## Seed the Database

Populate the database with sample products:

```bash
node seeds.js
```

---

## Run the Application

```bash
node index.js
```

or

```bash
npm start
```

Visit:

```
http://localhost:3000/products
```

---

## Routes

| Method | Route              | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | /products          | View all products        |
| GET    | /products/new      | Form to create a product |
| POST   | /products          | Create product           |
| GET    | /products/:id      | View product             |
| GET    | /products/:id/edit | Edit form                |
| PUT    | /products/:id      | Update product           |
| DELETE | /products/:id      | Delete product           |

---

## Product Schema

```javascript
{
    name: String,
    price: Number,
    category: ['fruit', 'vegetable', 'dairy']
}
```

---

## Future Improvements

- Bootstrap/Tailwind UI
- Product images
- Form validation with error pages
- Flash messages
- Search functionality
- Deploy with MongoDB Atlas

---

## License

This project is intended for learning purposes.
