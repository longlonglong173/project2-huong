const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const { userForm } = require(path.resolve('modules/mixin.js'));

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    const reqten = req.body.ten || null;
    const reqCccd = req.body.cccd || null;
    const reqGioiTinh = req.body.gioiTinh || null;
    const reqSoDt = req.body.soDT || null;
    const reqEmail = req.body.email || null;
    const reqDiaChi = req.body.diaChi || null;
    try {
        if (reqMa == null) {
            return res.status(200).json({
                success: false,
                message: 'Id is invalid',
            });
        }
        let user = await NguoiDung.findOne({
            ma: reqMa,
        }).exec();
        if (user == null) {
            return res.status(200).json({
                success: false,
                message: `Can not find user with id = ${reqMa}`,
            });
        }
        if (reqten) {
            user.ten = reqten;
        }
        if (reqCccd) {
            user.cccd = reqCccd;
        }
        if (reqGioiTinh) {
            user.gioiTinh = reqGioiTinh;
        }
        if (reqSoDt) {
            user.soDT = reqSoDt;
        }
        if (reqEmail) {
            user.email = reqEmail;
        }
        if (reqDiaChi) {
            user.diaChi = reqAddress;
        }
        await user.save();
        return res.status(200).json({
            success: true,
            data: userForm(user),
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
