const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));

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
        chiTiet: tour.chiTiet || '',
        hinhAnh: tour.hinhAnh
    };
}

// router.get('/', async (req, res) => {
//     return res.json('Lay danh sach tour API');
// });

router.get('/', async (req, res) => {
    const reqIndex = req.query.index || 0;
    const reqCount = req.query.count || 20
    try {

        const tourList = await Tour.find()

        if (reqIndex >= tourList.length) {
            return res.status(400).json({
                success: false,
                message: 'No data'
            });
        }

        const tourListCopy = tourList.slice(reqIndex, reqIndex + reqCount)
        const result = tourListCopy.map(tour => tourForm(tour))
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
