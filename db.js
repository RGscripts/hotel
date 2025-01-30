const { error } = require('console');
const mongoose = require('mongoose');
require('dotenv').config();
// Define the mongodb connection url
//const mongoURL = process.env.MONGODB_URL_LOCAL //we can give any name in place 'hotels' name
const mongoURL = process.env.MONGODB_URL;

// Set up mongodb connection (this setup is compulsory and if we do not include this setup warning message 
// will be displayed as we are marking the changes in url so its necessary )
mongoose.connect(mongoURL)
  .then(() => console.log('Connected To MongoDB Server'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
  
// Get the default connection
// Mongooes maintains a default connection object repressenting the MongoDB connection
const db = mongoose.connection; 

// define the event listener for database connection 
db.on('connected', ()=>{
    console.log('Connected To MongoDB Server');
});

db.on('error', ()=>{
    console.log('MongoDB connection error: ', err);
});

db.on('disconnected', ()=>{
    console.log('Disconnected To MongoDB Server');
});

// Export the database connection
module.exports = db;
