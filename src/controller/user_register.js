const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const { successResponse, errorResponse } = require("./mesage");
const main = require("./mailer");
const jwt = require('jsonwebtoken');
const cookieParsar = require("cookie-parser");
const session = require('express-session');
const { response } = require('express');
const { isUndefined } = require('underscore');



const register = async (req, res) => {
  try {
    //console.log(req.body);
    const email3 = req.body.email;
    // const mobile1 = req.body.mobile;
    if (await Student.findOne({ email: email3 })) {
      res.send(errorResponse("Email Already exist"));
      // } else if (await Student.findOne({ mobile: mobile1 })) {
      //     res.send(fail("Mobile number Already exist"));
    } else {
      try {
        
        const httpURL= "http://192.168.1.91/users/generate-password";
        const redirectUrl =true?(req.body.redirectUrl):httpURL;
        console.log(redirectUrl);
        const st1 = new Student({

          email: req.body.email,

        });
        const createSt = await st1.save();
        
        const newRegistrationUrl = `${redirectUrl}/${encodeURIComponent(
          createSt.registrationToken.token
        )}?on=register`;
      
          
        (main(st1.email, "link", newRegistrationUrl));
        
        res.send(successResponse(`An email validation link was just emailed to you at ${req.body.email}, please verify your email and follow the instructions to complete your registration.
          We're happy to have you as part of our community!`, createSt));
      } catch (error) {
        res.send(errorResponse("Registration not Successfull..!!"));
      }
    }
  } catch (error) {
    res.send(errorResponse("Technical Error"));
  }
}


module.exports = register;