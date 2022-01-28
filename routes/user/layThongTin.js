const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const { userForm } = require(path.resolve('modules/mixin.js'));

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
            data: userForm(nguoiDung, true),
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
