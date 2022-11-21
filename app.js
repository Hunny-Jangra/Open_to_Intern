const express = require('express');
const dotenv = require('dotenv');
const college = require('./Router/collegeRouter');
const intern = require('./Router/inetrnRouter');

const app = express();

dotenv.config({
    path : './config.env'
})

app.use(express.json());


app.use('/', college);
app.use('/', intern);

module.exports = app;