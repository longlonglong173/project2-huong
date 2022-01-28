const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));
const {tourForm} = require(path.resolve('modules/mixin.js'));

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

router.get('/', async (req, res) => {
    return res.json('Lay thong tin tour API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    try {
        if (reqMa == null) {
            return res.status(400).json({
                success: false,
            });
        }

        const tour = await Tour.findOne({
            ma: reqMa,
        });
        if (tour == null) {
            return res.status(400).json({
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            data: tourForm(tour),
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
