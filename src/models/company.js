const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const validator = require('validator');
//const sanitize = require('mongo-sanitize');
//const logger = require('../utils/logger')(module);
//const UiOptions = require('./ui-options');
//const MetaData = require('./meta-data');


const companySchema = new Schema({

   userId:{type:ObjectId},
    name: {
        type: String,
        // required:[true,"Name Which is Appear On Reports Should be Given"],
    },
    address: {
        type: String,
        // required: [true,'Address must be given'],
    },
    countryName: String,
    countryState: String,
    status: {
        type: String,
        enum: ['Active','Inactive'],
        default: 'Active'
    },
    domicile: String,
    fax: String,
    email:{
        type: String,
        lowercase: true,
        unique: true,
        validate:{
            // sisAsync: false,
            validator:validator.isEmail,
            message: '{VALUE} is not a Valid Mail',
        },
       // required: [true, "Company Email is Neccessary"],
    },
    outGoingMails:{
        type: String,
        default: ""
    },
    officialNumber:{
        type: String,
        // required:[true,'Official Number is neccesary'],
    },
    logoUrl: {
        type: String
    },
    
   
   // ui: UiOptions.schema,
    payrollSetting: {
        epfNumber: {
            type:String,
        },
        taxationNumber: String,
        panNumber: {
            type: String,
        },
        tanNumber: {
            type: String
        },
        tdsCircle: {
            type: String
        },
        deductionCycle: {
            type: String,
            enum: ['Monthly','Quarterly','Yearly'],
        },
    },
    bankDetails: {
        bankName: String,
        bankAccNum: String,
        bankType: String
    }
});

// /////////////////////////////////
// PROPERTIES
// /////////////////////////////////


const Company =  new mongoose.model('Company',companySchema);

module.exports=Company;