const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));

function userForm(user) {
    return {
        ten: user.ten || null,
        gioiTinh: user.gioiTinh || null,
        email: user.email || null,
        soDT: user.soDT || null,
        ma: user.ma || null,
        diaChi: user.diaChi || null,
    };
}

router.get('/', async (req, res) => {
    return res.json('Lay thong tin nguoi dung API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    try {
        if (reqMa == null) {
            return res.json({
                success: false,
            });
        }

        const nguoiDung = await NguoiDung.findOne({
            ma: reqMa,
        });
        if (nguoiDung == null) {
            return res.json({
                success: false,
            });
        }

        return res.json({
            success: true,
            data: userForm(nguoiDung),
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
