const interncontroller = require('../controller/internController');
const express = require('express');

const router = express.Router();

router 
    .route('/functionup/interns')
    .post(interncontroller.createIntern);
router
    .route('/getintern')
    .get(interncontroller.getIntern);

module.exports = router;