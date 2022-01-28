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

const taoId = require('./routes/id/taoIdList');
app.use('/taoId', taoId);

const themNguoiDung = require('./routes/user/themNguoiDung');
app.use('/themNguoiDung', themNguoiDung);

const dangNhap = require('./routes/user/dangNhap');
app.use('/dangNhap', dangNhap);

const layThongTinNguoiDung = require('./routes/user/layThongTin');
app.use('/layThongTinNguoiDung', layThongTinNguoiDung);

const layDanhSachNguoiDungRoute = require('./routes/user/layDanhSachNguoiDung');
app.use('/layDanhSachNguoiDung', layDanhSachNguoiDungRoute);

const setVaiRoute = require('./routes/user/setVai');
app.use('/setVai', setVaiRoute);

const suaNguoiDungRoute = require('./routes/user/suaNguoiDung');
app.use('/suaNguoiDung', suaNguoiDungRoute);

const xoaNguoiDungRoute = require('./routes/user/xoaNguoiDung');
app.use('/xoaNguoiDung', xoaNguoiDungRoute);

//----- TOUR

const themTour = require('./routes/tour/themTour');
app.use('/themTour', themTour);

const layThongTinTour = require('./routes/tour/layThongTin');
app.use('/layThongTinTour', layThongTinTour);

const layDanhSachTourRoute = require('./routes/tour/layDanhSachTour');
app.use('/layDanhSachTour', layDanhSachTourRoute);

const timKiemTourTheoDiaDiemRoute = require('./routes/tour/timKiemTourTheoDiaDiem');
app.use('/timKiemTourTheoDiaDiem', timKiemTourTheoDiaDiemRoute);

const xoaTourRoute = require('./routes/tour/xoaTour');
app.use('/xoaTour', xoaTourRoute);

const suaTourRoute = require('./routes/tour/suaTour');
app.use('/suaTour', suaTourRoute);

//-----   BOOKING

const datVe = require('./routes/booking/datVe');
app.use('/datVe', datVe);

const thongKeTour = require('./routes/booking/thongKeTour');
app.use('/thongKeTour', thongKeTour);

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
