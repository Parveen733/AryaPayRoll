const express = require('express');
const router = new express.Router();
//const User = require("../models/user");
const { successResponse, errorResponse } = require("./mesage");
const main = require("./mailer")
const bcrypt = require('bcryptjs');
const cookieParsar = require("cookie-parser");
const session = require('express-session');
const User = require('../models/user');
// setPass=module.exports;


var sess;
var setPass = async (req, res) => {
    // const token = await Student.findOne({tokens});
    sess = req.session;

    try {
        var jk;
        const token1 = req.body.token;
        // console.log(`${req.session.tokens}`);
        console.log(token1);
       if( jk=await User.findOne({'registrationToken.token':token1})){
           console.log(jk);
        // const tok = token12.tokens[0].token;
        // console.log(token12);
     
            try {
                console.log("dfs");
                const pass1 = req.body.password;
                const confirmPass1 = req.body.passwordConfirmation;
                if (pass1 === confirmPass1) {console.log("dfds");
                    const passwordHash = await bcrypt.hash(pass1, 10);
                    console.log(passwordHash);
                    const email1 = jk.email;

                    const updateData = await User.findOneAndUpdate({ email: email1 }, { $set: {password: passwordHash } }, { new: true, useFindAndModify: false });
                    console.log("jfkg");
                    sess.id=updateData._id;
                    res.send(successResponse("Password Update Successfull", updateData));
                }
                else {
                    res.send(errorResponse("password not match"));
                }

            } catch (err) {
                res.send(errorResponse("Enter valid Email"));
            }
        } else {
            res.send(errorResponse("token not match"));
        }





    } catch (err) {
        res.send(errorResponse("Techncal Error for forget password"));
    }
};
module.exports = setPass;
