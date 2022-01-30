const express = require('express');
const router = express.Router();
const path = require('path');
const DatVe = require(path.resolve('models/DatVe.js'));
const Tour = require(path.resolve('models/Tour.js'));
const { formDatVe } = require(path.resolve('modules/mixin.js'));

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    try {
        if (reqMa == null) {
            return res.status(400).json({
                success: false,
            });
        }
        const ve = await DatVe.findOne({
            ma: reqMa,
        });

        if (ve == null) {
            return res.status(400).json({
                success: false,
                message: 'No data',
            });
        }
        const tour = await Tour.findOne({
            ma: ve.maTour,
        });
        ve.ten = req.body.ten || ve.ten;
        ve.cccd = req.body.cccd || ve.cccd;
        ve, (soDT = req.body.soDT || ve.soDT);
        ve.email = req.body.email || ve.email;
        ve.diaChi = req.body.diaChi || ve.diaChi;
        ve.ghiChu = req.body.ghiChu || ve.ghiChu;
        ve.gioiTinh = req.body.gioiTinh || ve.gioiTinh;
        await ve.save();

        return res.json({
            data: formDatVe(ve, tour),
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
