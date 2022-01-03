const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // liên quan đến phần bảo mật phía server
const fileUpload = require('express-fileupload'); //noaif ra thì còn thể dùng 1 số cái multer
const path = require('path');
require('dotenv/config');

const ROUTE = process.env.PORT || 3000;

// MIDDLEWARE
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());


// ROUTE



// CONNECT TO DATABASE
const db = mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('connected to Database');
});
mongoose.connection.on('disconnected', () => {
    console.log('disconnected to Database');
});

// listen port server
app.listen(ROUTE, () => {
    console.log('Server is running!!!');
});