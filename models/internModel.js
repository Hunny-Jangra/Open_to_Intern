const mongoose = require('mongoose');
const validator = require('validator');
const ObjectID = mongoose.Types.ObjectId;


const internSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true, 'name field is mandatory'],
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required (email is mandatory field)'],
        validate: [validator.isEmail, 'Please provide valid Email']
    },
    mobile: {
        type: String,
        trim: true,
        required: 'mobile number is required',
        minlength: 10,
        maxlength: 10,
        unique: true
    },
    collegeId: {
        type: ObjectID,
        ref: 'CollegeModel',
        trim: true,
        required: 'college Id is not mentioned'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})



const InternModel = mongoose.model('InternModel', internSchema);

module.exports = InternModel;