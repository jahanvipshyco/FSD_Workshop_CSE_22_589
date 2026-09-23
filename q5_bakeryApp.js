// Q5. Express.js with HTML pages - Bakery Website
// Run: npm install express   then   node q5_bakeryApp.js

const express = require('express');
const app = express();

// / - Home page: bakery name & welcome message
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Sweet Crumbs Bakery</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding:40px;">
        <h1>🍰 Sweet Crumbs Bakery 🍰</h1>
        <p>Welcome to Sweet Crumbs Bakery! Freshly baked happiness, every single day.</p>
        <p><a href="/menu">View Menu</a> | <a href="/contact">Contact Us</a></p>
      </body>
    </html>
  `);
});

// /menu - list of items like cakes, pastries
app.get('/menu', (req, res) => {
  res.send(`
    <html>
      <head><title>Menu - Sweet Crumbs Bakery</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding:40px;">
        <h1>Our Menu</h1>
        <ul style="list-style:none; padding:0;">
          <li>🎂 Chocolate Truffle Cake</li>
          <li>🥐 Butter Croissants</li>
          <li>🍩 Glazed Donuts</li>
          <li>🍪 Chocolate Chip Cookies</li>
          <li>🥧 Fresh Fruit Tart</li>
        </ul>
        <p><a href="/">Home</a> | <a href="/contact">Contact Us</a></p>
      </body>
    </html>
  `);
});

// /contact - phone number & address
app.get('/contact', (req, res) => {
  res.send(`
    <html>
      <head><title>Contact - Sweet Crumbs Bakery</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding:40px;">
        <h1>Contact Us</h1>
        <p>📞 Phone: +91 98765 43210</p>
        <p>📍 Address: 12 Baker Street, Model Town, New Delhi, India</p>
        <p><a href="/">Home</a> | <a href="/menu">View Menu</a></p>
      </body>
    </html>
  `);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Bakery website running at http://localhost:${PORT}/`);
});
