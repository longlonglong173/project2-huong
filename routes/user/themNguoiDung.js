const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const IdList = require(path.resolve('models/IdList.js'));
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
    return res.json('Them nguoi dung API');
});

router.post('/', async (req, res) => {
    const reqMaSoDN = req.body.maSoDN || null;
    const reqMatKhau = req.body.matKhau || null;
    const reqTen = req.body.ten || null;
    const reqGioiTinh = req.body.gioiTinh || null;
    const reqSoDT = req.body.soDT || null;
    const reqEmail = req.body.email || null;
    const reqDiaChi = req.body.diachi || null;
    const reqCccd = req.body.cccd || null 
    try {
        if (reqMaSoDN == null || reqMatKhau == null) {
            return res.json({
                success: false,
            });
        }

        let isDuplicate = await NguoiDung.findOne({
            maSoDN: reqMaSoDN,
        }).exec();

        if (isDuplicate != null) {
            return res.json({
                success: false,
                error: 'username'
            });
        }

        const currentId = await IdList.findOne({
            name: 'NguoiDung',
        });


        const count = currentId.currentId + 1;

        const dataToken = {
            maSoDN: req.body.maSoDN,
            matKhau: req.body.matKhau,
        };
        const token = jwt.sign(dataToken, process.env.ACCESS_TOKEN_KEY, {
            // expiresIn: '1h',
        });

        let newUser = new NguoiDung({
            maSoDN: reqMaSoDN,
            matKhau: reqMatKhau,
            ma: count,
            token: token
        });

        currentId.currentId = count;
        await currentId.save();

        if (reqTen != null) {
            newUser.ten = reqTen;
        }

        if (reqGioiTinh != null) {
            newUser.gioiTinh = reqGioiTinh;
        }

        if (reqSoDT != null) {
            newUser.soDT = reqSoDT;
        }

        if (reqEmail != null) {
            newUser.email = reqEmail;
        }

        if (reqDiaChi != null) {
            newUser.diaChi = reqDiaChi;
        }

        if (reqCccd != null) {
            newUser.cccd = reqCccd
        }

        await newUser.save();

        return res.json({
            success: true,
            data: userForm(newUser)
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
