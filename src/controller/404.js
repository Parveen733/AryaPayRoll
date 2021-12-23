const express = require('express');
const router = new express.Router();
const Student = require("../models/user");
const {successResponse, errorResponse } = require("./mesage");

const error_404=async (req,res)=>{
    res.send(errorResponse("Page notsd found"));
}

module.exports=error_404;