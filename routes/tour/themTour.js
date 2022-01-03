const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));
const IdList = require(path.resolve('models/IdList.js'));

function tourForm(tour) {
    return {
        ma: tour.ma,
        ten: tour.ten,
        thoiGian: tour.thoiGian,
        ngayKhoiHanh: tour.ngayKhoiHanh,
        noiKhoiHanh: tour.noiKhoiHanh,
        phuongTien: tour.phuongTien,
        gia: tour.gia,
        diaDiem: tour.diaDiem,
    };
}

router.get('/', async (req, res) => {
    return res.json('Them tour API');
});

router.post('/', async (req, res) => {
    const reqTen = req.body.ten || null;
    const reqThoiGian = req.body.thoiGian || null;
    const reqNgayKhoiHanh = req.body.ngayKhoiHanh || null;
    const reqNoiKhoiHanh = req.body.noiKhoiHanh || null;
    const reqPhuongTien = req.body.phuongTien || null;
    const reqGia = req.body.gia || null;
    const reqDiaDiem = req.body.diaDiem || null;
    try {
        if (
            reqTen == null ||
            reqThoiGian == null ||
            reqNgayKhoiHanh == null ||
            reqNoiKhoiHanh == null ||
            reqPhuongTien == null ||
            reqGia == null ||
            reqDiaDiem == null
        ) {
            return res.json({
                success: false,
            });
        }

        const currentId = await IdList.findOne({
            name: 'Tour',
        });
        const count = currentId.currentId + 1;

        const tour = new Tour({
            ma: count,
            ten: reqTen,
            thoiGian: reqThoiGian,
            ngayKhoiHanh: reqNgayKhoiHanh,
            noiKhoiHanh: reqNoiKhoiHanh,
            phuongTien: reqPhuongTien,
            gia: reqGia,
            diaDiem: reqDiaDiem,
        });

        currentId.currentId = count;
        await currentId.save();

        await tour.save();

        return res.json({
            data: tourForm(tour),
            success: true,
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
