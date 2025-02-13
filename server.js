// Json to Object Conversion
// const jsonString = '{ "name" : "Oggy", "age" : 20, "city" : "India"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// Object to Json Conversion
// const objectToConvert = {
//     name : "Oggy",
//     age : 20
// }
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified);

// Now i am going to make the server
const express = require('express') //Telling the system that we require to build the server
const app = express();
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body

const PORT = process.env.PORT || 3000;

// As we know that our server will be getting multiple login request so to know the at what router 
// and at what time the request are made we can use logRequest
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //move to the next part
}
app.use(logRequest);

app.use(passport.initialize());
// Login Route
const localAuthMiddleware = passport.authenticate('local', { session: false })
app.post('/login' , (req, res) => {
    res.send('Login successful');
});

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel');
});

//For Person
//import the router file 
const personRoutes = require('./routes/personRoutes');

//use the routers
app.use('/person', personRoutes);

// For Menu
//import the router file 
const menuRoutes = require('./routes/menuRoutes');
const { models } = require('mongoose');

//use the routers
app.use('/menu',  menuRoutes);

app.listen(PORT, ()=>{
    console.log("Server is listining");
}) //Port


// app.get('/sweet', function (req, res) {
//     res.send('What kind of sweet would u like to have ?')
//   })

// app.get('/pen', (req, res)=> {
//     var customizablePen = {
//         name : 'Linc Maxo',
//         color : 'Blue',
//         isBlue : true
//     }
//     res.send(customizablePen)
//   })

// app.post('/items', (req, res)=>{
//     res.send('Your Data Is Saved')
// })  
