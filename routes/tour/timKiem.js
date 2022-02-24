const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));
// const IdList = require(path.resolve('models/IdList.js'));
const { tourForm } = require(path.resolve('modules/mixin.js'));

// function tourForm(tour) {
//     return {
//         ma: tour.ma,
//         ten: tour.ten,
//         thoiGian: tour.thoiGian,
//         ngayKhoiHanh: tour.ngayKhoiHanh,
//         noiKhoiHanh: tour.noiKhoiHanh,
//         phuongTien: tour.phuongTien,
//         giaHienTai: tour.giaHienTai,
//         giaCu: tour.giaCu,
//         diaDiem: tour.diaDiem,
//         hinhAnh: tour.hinhAnh

//     };
// }

// router.get('/', async (req, res) => {
//     return res.json('Tim Kiem Tour Theo Dia Diem API');
// });

router.get('/', async (req, res) => {
    const reqType = req.query.type || 'title'; // title / price
    const reqKeyword = req.query.keyword || null;
    const reqOption = req.query.option || 0; //  0 là bằng, -1 nhỏ hơn, 1 lớn hơn
    try {
        if (reqKeyword == null) {
            return res.status(400).json({
                success: false,
            });
        }

        let danhSachKetQua = [];
        if (reqType == 'title') {
            danhSachKetQua = await Tour.find({
                ten: { $regex: reqKeyword, $options: 'i' },
            });
        } else if (reqType == 'price') {
            if (reqOption == -1) {
                danhSachKetQua = await Tour.find({
                    giaHienTai: { $lte: reqKeyword },
                });
            } else if (reqOption == 1) {
                danhSachKetQua = await Tour.find({
                    giaHienTai: { $gte: reqKeyword },
                });
            } else {
                danhSachKetQua = await Tour.find({
                    giaHienTai: reqKeyword,
                });
            }
        }
        if (danhSachKetQua == []) {
            return res.status(400).json({
                success: true,
                data: [],
            });
        }

        let ketQua = [];

        for (let i = 0; i < danhSachKetQua.length; i++) {
            ketQua.push(tourForm(danhSachKetQua[i]));
        }

        return res.status(200).json({
            data: ketQua,
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
