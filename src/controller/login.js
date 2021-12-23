const express = require('express');
const router = new express.Router();
const User = require("../models/user");
const { successResponse, errorResponse } = require("./mesage");
const bcrypt = require('bcryptjs');
const cookieParsar = require("cookie-parser");
const session = require('express-session');
// const companySession = require("./company_session");


 var sess;
const login = async (req, res) => {
    console.log(req.body);
    sess= req.session;
    // console.log(req.session.tokens); 
    try {
        const email1 = req.body.email;
        const pass1 = req.body.password;
        //    console.log(req.session.tokens); 
        try {
            const data = await User.findOne({ email: email1 });
            console.log(data);
            const isMatch = await bcrypt.compare(pass1, data.password);
            console.log('hid');
            if (isMatch) {
                console.log(data.email);
                // const companylist  = companySession(data.email)
                console.log("hist");
                // session.email=data.email;
                // console.log(session.email);
                // companylist=req.session.companyList;
                // console.log(companyList);
                sess.email=data.email;
            //    console.log(companylist);
                res.send(successResponse("login Successfully...!!!",data));;
            }
            else {
                console.log("hit");
                res.send(errorResponse("Email and Pasword Invalid1...!!!"));

            }
        }
        catch (err) {
            res.send(errorResponse("Email and Pasword Invalid2...!!!"));
        }
    } catch (error) {
        res.send(errorResponse("server side error...!!!"));
    }


};

module.exports = login;