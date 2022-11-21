const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter name >>>> name is mandatory filed',
        trim: true,
        unique: true,
        lowercase: true 
    },
    fullName: {
        type: String,
        required: [true, 'Please enter fullname >>>> fullName is mandatory filed'],
        trim: true,
        lowercase: true 
    },
    logoLink : {
        type: String,
        required: [true, 'Please enter logolink >>>> logolink is mandatory filed']
    },
    isDeleted : {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const CollegeModel = mongoose.model('CollegeModel', collegeSchema);

module.exports = CollegeModel;