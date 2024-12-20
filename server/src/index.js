// CONFIGURATION
require('dotenv').config(); // ENVIRONMENT CONFIGURATION
require('module-alias/register'); // MODULE ALIAS SETUP

// IMPORTS
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

// INTERNAL MODULES
const db = require('@/models');
const authMiddleware = require('@/middleware/authMiddleware');
const errorHandler = require('@/middleware/errorHandler');

// INITIALIZE APP AND SERVER
const { app, server } = require('@/lib/socket');
const port = process.env.SERVER_PORT || 5002;

// TRUST PROXY IF IN PRODUCTION
if (app.get('env') === 'production') app.set('trust proxy', 1);

// MIDDLEWARE CONFIGURATION

// PARSE URL-ENCODED AND JSON BODIES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// COOKIE HANDLING MIDDLEWARE
app.use(cookie());

// CORS CONFIGURATION MIDDLEWARE
app.use(cors({
  origin: process.env.ALLOWEDORIGIN,
  methods: "GET, POST, PUT, DELETE", 
  credentials: true
}));

// AUTHENTICATION CHECK MIDDLEWARE
app.use(authMiddleware.checkUser);

// ROUTES
app.use('/api', require('@/routes'));

// 404 ROUTE FOR UNIDENTIFIED RESOURCES
app.all('*', (req, res) => {
	res.sendStatus(404);
});

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// START SERVER AND SYNC DATABASE
db.sequelize.sync({ alter: true })
  .then(() => {
    server.listen(port, () => {
      console.log('Server started on port ' + port);
    });
  })
  .catch(() => {
    console.error('Error connecting to database');
  });