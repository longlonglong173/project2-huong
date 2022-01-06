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
        vai: user.vai || null,
        token: user.token || '',
    };
}

const danhSachVai = ['CLIENT', 'MANAGER'];

router.get('/', async (req, res) => {
    return res.json('SET VAI API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    const reqVai = req.body.vai || null;
    try {
        if (reqMa == null || reqVai == null) {
            return res.json({
                success: false,
            });
        }

        if (danhSachVai.findIndex((item) => item == reqVai) == -1) {
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

        nguoiDung.vai = reqVai;
        await nguoiDung.save();

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
