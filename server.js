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

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body

// app.get('/', function (req, res) {
//     res.send('Welcome to the Hotel')
//   })




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

//For Person
//import the router file 
const personRoutes = require('./routes/personRoutes');

//use the routers
app.use('/person', personRoutes);

// For Menu
//import the router file 
const menuRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/menu', menuRoutes);

app.listen(3000, ()=>{
    console.log("Server is listining");
}) //Port