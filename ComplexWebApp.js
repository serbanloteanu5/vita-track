/*
Filename: ComplexWebApp.js

This code is a complex web application that simulates an e-commerce platform. It includes user authentication, product listing, shopping cart functionality, and order processing. The code is written in JavaScript and uses modern frameworks and libraries.

Author: [Your Name]
Date: [Current Date]
*/

// Define global variables
let userLoggedIn = false;
let currentUser = null;
let products = [];
let cart = [];

// Define classes and functions

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  login() {
    // Implementation for user login
    userLoggedIn = true;
    currentUser = this;
    console.log(`User ${this.email} is now logged in.`);
  }

  logout() {
    // Implementation for user logout
    userLoggedIn = false;
    currentUser = null;
    console.log(`User logged out.`);
  }
}

class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

function addProduct(name, price, description) {
  const product = new Product(name, price, description);
  products.push(product);
  console.log(`Product ${name} added.`);
}

function displayProducts() {
  console.log("Product Listing:");
  products.forEach((product, index) => {
    console.log(`
      Product ${index + 1}:
      Name: ${product.name}
      Price: $${product.price}
      Description: ${product.description}
      `);
  });
}

function addToCart(index) {
  const product = products[index - 1];
  cart.push(product);
  console.log(`Product ${product.name} added to cart.`);
}

function displayCart() {
  console.log("Shopping Cart:");
  cart.forEach((product, index) => {
    console.log(`
      Product ${index + 1}:
      Name: ${product.name}
      Price: $${product.price}
      Description: ${product.description}
      `);
  });
}

function placeOrder() {
  console.log("Order Processing:");
  if (!userLoggedIn) {
    console.log('Cannot place order. Please login first.');
    return;
  }

  if (cart.length === 0) {
    console.log('Cannot place order. Cart is empty.');
    return;
  }

  console.log('Order placed successfully!');
  console.log('Products:');
  displayCart();
  console.log('Total:', calculateTotalPrice());
  console.log('Thank you for shopping!');
  emptyCart();
}

function calculateTotalPrice() {
  return cart.reduce((total, product) => total + product.price, 0);
}

function emptyCart() {
  cart = [];
  console.log('Shopping cart emptied.');
}

// Sample usage:

// Create sample products
addProduct('iPhone 12', 1000, 'The latest iPhone model.');
addProduct('MacBook Pro', 2000, 'Powerful laptop for professionals.');

// Display products
displayProducts();

// Create user and login
const user = new User('John Doe', 'john.doe@example.com', 'password');
user.login();

// Add products to cart
addToCart(1);
addToCart(2);

// Display cart
displayCart();

// Place order
placeOrder();

// Logout user
user.logout();