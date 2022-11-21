const express = require('express');
const CollegeController = require('../controller/collegeController');
const router = express.Router();

router  
    .route('/functionup/colleges')
    .post(CollegeController.createCollege);

router  
    .route('/functionup/collegeDetails')
    .get(CollegeController.getCollege);

module.exports = router;