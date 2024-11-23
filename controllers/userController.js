const AuthUser = require("../models/authUser");
const Customer = require("../models/customerSchema");
var moment = require("moment");
var jwt = require('jsonwebtoken');

//   /home
//    done
const user_index_get = (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

    AuthUser.findById(decoded.id)
    Customer.find()
        .then((result) => {
            console.log("***********************************************")
            console.log(result)
            const customerInfo = Array.isArray(result.customerInfo) ? result.customerInfo : [];
            res.render("index", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};


const user_post = (req, res) => {
    Customer.create(req.body)
        .then(() => {
            res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
        });
};








const user_edit_get = (req, res) => {
    Customer.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};

const user_view_get = (req, res) => {
    // result ==> object
    Customer.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};

const user_search_post = (req, res) => {
    console.log("*******************************");

    const searchText = req.body.searchText.trim();

    Customer.find({ $or: [{ fireName: searchText }, { lastName: searchText }] })
        .then((result) => {
            console.log(result);
            res.render("user/search", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};

const user_delete = (req, res) => {
    Customer.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.redirect("/home");
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const user_put = (req, res) => {
    Customer.updateOne({ _id: req.params.id }, req.body)
        .then((result) => {
            res.redirect("/home");
        })
        .catch((err) => {
            console.log(err);
        });
};

const user_add_get = (req, res) => {
    res.render("user/add");
};



module.exports = {
    user_index_get,
    user_edit_get,
    user_view_get,
    user_search_post,
    user_delete,
    user_put,
    user_add_get,
    user_post,
};