const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require(path.resolve('models/Tour.js'));
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const danhSachVaiQL = ['ADMIN', 'MANAGER'];
const {tourForm} = require(path.resolve('modules/mixin.js'));

router.get('/', async (req, res) => {
    return res.json('Sua tour API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    // const reqToken = req.body.token || null;
    try {
        if (reqMa == null) {
            return res.status(400).json({
                success: false,
            });
        }

        // const nguoiDung = await NguoiDung.findOne({
        //     token: reqToken,
        // });

        // if (nguoiDung == null) {
        //     return res.json({
        //         success: false,
        //         message: 'Token is invalid.',
        //     });
        // }

        // if (danhSachVaiQL.findIndex((item) => item == nguoiDung.vai) == -1) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Not Access.',
        //     });
        // }

        const tour = await Tour.findOne({
            ma: reqMa,
        });

        if (tour == null) {
            return res.status(400).json({
                success: false,
            });
        }

        // UPDATE TOUR's INFOMATION
        if (req.body.hinhAnh != null) {
            tour.hinhAnh = req.body.hinhAnh;
        }
        if (req.body.ten != null) {
            tour.ten = req.body.ten;
        }
        if (req.body.thoiGian != null) {
            tour.thoiGian = req.body.thoiGian;
        }
        if (req.body.ngayKhoiHanh != null) {
            tour.ngayKhoiHanh = req.body.ngayKhoiHanh;
        }
        if (req.body.noiKhoiHanh != null) {
            tour.noiKhoiHanh = req.body.noiKhoiHanh;
        }

        if (req.body.phuongTien != null) {
            tour.phuongTien = req.body.phuongTien;
        }

        if (req.body.giaHienTai != null) {
            tour.giaHienTai = req.body.giaHienTai;
        }

        if (req.body.giaCu != null) {
            tour.giaCu = req.body.giaCu;
        }

        if (req.body.diaDiem != null) {
            tour.diaDiem = req.body.diaDiem;
        }

        if (req.body.hinhAnh != null) {
            tour.hinhAnh = req.body.hinhAnh;
        }

        if (req.body.chiTiet != null) {
            tour.chiTiet = req.body.chiTiet;
        }

        if (req.body.slot != null) {
            tour.slot = req.body.slot;
        }
        //

        await tour.save();

        return res.status(200).json({
            data: tourForm(tour),
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
