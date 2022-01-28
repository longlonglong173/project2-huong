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
        giaHienTai: tour.giaHienTai,
        giaCu: tour.giaCu,
        diaDiem: tour.diaDiem,
        hinhAnh: tour.hinhAnh,
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
    const reqGiaHienTai = req.body.giaHienTai || 0;
    const reqGiaCu = req.body.giaCu || 0;
    const reqDiaDiem = req.body.diaDiem || null;
    const reqHinhAnh = req.body.hinhAnh || null;
    const reqChiTiet = req.body.chiTiet || '';
    const reqSlot = req.body.slot || 0;
    try {
        if (
            reqTen == null ||
            reqThoiGian == null ||
            reqNgayKhoiHanh == null ||
            reqNoiKhoiHanh == null ||
            reqPhuongTien == null ||
            reqGiaHienTai == null ||
            reqDiaDiem == null ||
            reqHinhAnh == null
        ) {
            return res.status(400).json({
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
            giaHienTai: reqGiaHienTai,
            giaCu: reqGiaCu,
            diaDiem: reqDiaDiem,
            hinhAnh: reqHinhAnh,
            chiTiet: reqChiTiet,
            slot: reqSlot,
        });

        currentId.currentId = count;
        await currentId.save();

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
