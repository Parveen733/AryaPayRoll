
const Company = require("../models/company");
const ObjectID = require("mongodb").ObjectID;
//const MetaData = require("../models/meta-data");
//const commonFunction = require("../commonFunctions");
//const Holiday = require("../models/holiday");
//const Leave = require("../models/leave");
const User = require("../models/user");
const { successResponse, errorResponse } = require("./mesage");
//const JobProfile = require("../models/job-profile");
//const Department = require("../models/department");
const mongoose = require('mongoose');
const session = require('express-session');
// const moment = require("moment");
//const LeaveType = require("../models/leaves-type");
// const Branch = require("../models/branch");
// const DocumentTypes = require("../models/document-types");
// const GradeRule = require("../models/grade-rule");
// const JobCategory = require("../models/job-category");
// const PaymentHead = require("../models/payment-head");
// const SkillCategory = require("../models/skill-category");

// const multer = require("multer");



module.exports.addCompany = async function (req, res) {
  
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.email ||
    !req.body.officialNumber
  ) {
    return res.send(errorResponse("missing filed required..!!"));
  }
  // cons/ole.log("hi");
  try {
    const email = req.body.email;
    if (await Company.findOne({ email: email })) {
      res.send(errorResponse("Email Already exist"));
      // } else if (await Student.findOne({ mobile: mobile1 })) {
      //     res.send(fail("Mobile number Already exist"));
    } else {
      try {
        
        // var parentId=sss._id;
        
        // console.log(req.body.parentUserId);
        const companyData = new Company({
          userId:req.params.parentUserId,
          name: req.body.name,
          address: req.body.address,
          countryName: req.body.countryName,
          countryState: req.body.stateName,

          domicile: req.body.domicile,
          fax: req.body.fax,
          email: req.body.email,
          outGoingMails: req.body.outGoingMails,
          officialNumber: req.body.officialNumber,
          logoUrl: req.body.logoUrl,

          'payrollSetting.epfNumber': req.body.epfNumber,
          'payrollSetting.panNumber': req.body.panNumber,
          'payrollSetting.taxationNumber': req.body.taxationNumber,

          'bankDetails.bankName': req.body.bankName,
          'bankDetails.bankAccNum': req.body.bankAccNum,
          'bankDetails.bankType': req.body.bankType
        });

        const newCompany = await companyData.save();
        res.send(successResponse("company register succesfully",newCompany));
        console.log("Def");
      }
      catch (err) {
        return res.send(errorResponse("try 2nd block..!!"));
      }
    }
  } catch (err) {
    return res.send(errorResponse("try 1 block..!!"));
  }
};
module.exports.listAllCompanies = async function (req, res) {
  try {

    var companyData;
    companyData=await Company.find({userId:req.params.parentUserId });
      //res.send(errorResponse("Email Already exist"));
      console.log("---------------------------------------------------------------------------------------------------");
      // res.send(companyData);

      res.send({status:"success",
                message:"data send successfully",
                company:companyData});
    
    
  } catch (err) {
    return res.send(errorResponse("try 1 block..!!"));
  }
};