const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));
// const IdList = require(path.resolve('models/IdList.js'));

function tourForm(tour) {
    return {
        ma: tour.ma,
        ten: tour.ten,
        thoiGian: tour.thoiGian,
        ngayKhoiHanh: tour.ngayKhoiHanh,
        noiKhoiHanh: tour.noiKhoiHanh,
        phuongTien: tour.phuongTien,
        giaHienTai: tour.giaHienTai,
        giaCu: tour.giaCu,
        diaDiem: tour.diaDiem,
        hinhAnh: tour.hinhAnh

    };
}

router.get('/', async (req, res) => {
    return res.json('Tim Kiem Tour Theo Dia Diem API');
});

router.post('/', async (req, res) => {
    const reqKeyword = req.body.keyword || null;
    try {
        if (reqKeyword == null) {
            return res.json({
                success: false,
            });
        }

        let danhSachKetQua = await Tour.find({
            diaDiem: { $regex: reqKeyword, $options: 'i' },
        });
        console.log('OK');

        if (danhSachKetQua == []) {
            return res.json({
                success: true,
                data: [],
            });
        }

        let ketQua = [];

        for (let i = 0; i < danhSachKetQua.length; i++) {
            ketQua.push(tourForm(danhSachKetQua[i]));
        }

        return res.json({
            data: ketQua,
            success: true,
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
