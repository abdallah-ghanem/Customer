const express = require('express')
const app = express()
require('dotenv').config()//when add .env.MONGODB_URL must add this line
const port = process.env.PORT || 3001; 
const mongoose = require('mongoose');
app.set('view engine', 'ejs');//to use templet ejs
app.use(express.static('public'));//to use static file like css
//middelware to pass data
app.use(express.urlencoded({ extended: true }));
var moment = require('moment');//for date and time

//====================================================================================================
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})
//====================================================================================================
// Connect to MongoDB
//when add .env.MONGODB_URL must add this line
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
//====================================================================================================
//Requestes or rouets the main page
app.get('/', (req, res) => {
    Customer.find()
    .then((result) => {
        res.render('index', {arr: result, moment: moment})//arr use this in index.ejs
    }).then((error) => {
        console.log(error)
    })
    
})
//====================================================================================================
//page for add info
app.get('/user/add.html', (req, res) => {
    res.render('user/add')
})
//====================================================================================================
const Customer = require("./models/customerSchema");//to get data send from this path
//post request to creat new info
app.post('/user/add.html', (req, res) => {//same path for action that exist in .ejs
    Customer.create(req.body)
    .then(()=>{
        res.redirect('/')
    })
    .catch((error)=>{
        console.log(error);
    })
    console.log(req.body)
    /* res.render('user/add') */
})
//====================================================================================================
//to show information page
//any code contain :id must put down 
app.get('/user/:id', (req, res) => {
    Customer.findById(req.params.id)
    .then((result) => {
        res.render('user/view', {obj: result, moment: moment})//to pass id to the file of ejs
    }).catch((err) => {
        console.log(err);
    })
})
//====================================================================================================
//edit page
//use to show data 
app.get('/edit/:id', (req, res) => {//fouces /edit
    Customer.findById(req.params.id)
    .then((result) => {
        res.render('user/edit', {obj: result, moment: moment})//to pass id to the file of ejs
    }).catch((err) => {
        console.log(err);
    }) 
})
//====================================================================================================
//put to update data
//the next line for put and delet methoud
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.put('/edit/:id', (req, res) => {//fouces /edit
    // Extract data from the request body
    //const updatedData = req.body;
    // Update the customer document by ID
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
        res.redirect('/')
        //res.render('user/edit', {obj: result, moment: moment})//to pass id to the file of ejs
    }).catch((err) => {
        console.log(err);
    })   
})
//====================================================================================================
//Delet
app.delete('/delete/:id', (req, res) => {//fouces /delet
    Customer.deleteOne({ _id: req.params.id })
    .then(() => {
        res.redirect('/')
        //res.render('user/edit', {obj: result, moment: moment})//to pass id to the file of ejs
    }).catch((err) => {
        console.log(err);
    })   
}) 
//====================================================================================================
//search
app.post('/search', (req, res) => {
    Customer.find({ $or:[ {firstName: req.body.searchText}, {lastName: req.body.searchText}] })
    .then((result) => {
        console.log(result)
        res.render('user/search', {searchArrary: result})//render use to send you to another path
    }).catch((err) => {
        console.log(err);
    })   
})
//====================================================================================================
const allRoutes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");

app.use(allRoutes);
app.use( "/user/add.html",addUserRoute);


// cookie-parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//====================================================================================================
