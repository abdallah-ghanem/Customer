const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));//middelware to pass data (Send data to database)
app.set("view engine", "ejs");//to use templet ejs
app.use(express.static("public"));//to use static file like css and remain file from frontend
//====================================================================================================
//fo use PUT and DELET methouds
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
//====================================================================================================
//take all data from routes
const allRoutes = require("./routes/allRoutes");
const addUserRoute = require("./routes/addUser");
//====================================================================================================
// is middleware in Express.js that parses incoming JSON payloads in the request body and makes the data available in req.body.
app.use(express.json())
//====================================================================================================
// cookie-parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//====================================================================================================
//when add .env.MONGODB_URL must add this line
require('dotenv').config()
const port = process.env.PORT || 3001;
//====================================================================================================

/* // Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
 */
//====================================================================================================
//another form for connection to MongoDB
const mongoose = require("mongoose");
mongoose
    .connect(
        process.env.MONGODB_URL
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected To DB and the URL: http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
//====================================================================================================

    /* var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "yourusername",
        password: "yourpassword",
        database: "mydb"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        });
    }); */
//====================================================================================================
//middelware to use routes
app.use(allRoutes);
app.use("/user/add.html", addUserRoute);
