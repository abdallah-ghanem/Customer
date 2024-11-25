const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const custmoerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: String,
    country: String,
    gender: String,
}, {timestamps: true});//to active created at and updated at

// Create a model based on that schema
const Customer = mongoose.model("Customer", custmoerSchema);

// export the model
module.exports = Customer;