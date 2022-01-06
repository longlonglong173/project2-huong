const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const jwt = require('jsonwebtoken');

function userForm(user) {
    return {
        ten: user.ten || null,
        gioiTinh: user.gioiTinh || null,
        email: user.email || null,
        soDT: user.soDT || null,
        ma: user.ma || null,
        diaChi: user.diaChi || null,
        vai: user.vai || null,
        token: user.token || '',
    };
}

router.get('/', async (req, res) => {
    return res.json('DANG NHAP');
});

router.post('/', async (req, res) => {
    const reqMaSoDN = req.body.maSoDN || null;
    const reqMatKhau = req.body.matKhau || null;
    try {
        if (reqMaSoDN == null || reqMatKhau == null) {
            return res.json({
                success: false,
            });
        }

        const nguoiDung = await NguoiDung.findOne({
            maSoDN: reqMaSoDN,
            matKhau: reqMatKhau,
        });

        if (nguoiDung == null) {
            return res.json({
                success: false,
            });
        }

        const dataToken = {
            maSoDN: reqMaSoDN,
            matKhau: reqMatKhau,
        };
        const token = jwt.sign(dataToken, process.env.ACCESS_TOKEN_KEY, {
            // expiresIn: '1h',
        });
        if (nguoiDung.token == '' || nguoiDung.token == null) {
            nguoiDung.token = token;
        }

        await nguoiDung.save();

        return res.json({
            data: userForm(nguoiDung),
            success: true,
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
