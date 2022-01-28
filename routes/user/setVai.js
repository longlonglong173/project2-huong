const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const { userForm } = require(path.resolve('modules/mixin.js'));

const danhSachVai = ['CLIENT', 'MANAGER'];

router.get('/', async (req, res) => {
    return res.json('SET VAI API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    const reqVai = req.body.vai || null;
    try {
        if (reqMa == null || reqVai == null) {
            return res.status(400).json({
                success: false,
            });
        }

        if (danhSachVai.findIndex((item) => item == reqVai) == -1) {
            return res.status(400).json({
                success: false,
            });
        }

        const nguoiDung = await NguoiDung.findOne({
            ma: reqMa,
        });
        if (nguoiDung == null) {
            return res.status(400).json({
                success: false,
            });
        }

        nguoiDung.vai = reqVai;
        await nguoiDung.save();

        return res.status(200).json({
            success: true,
            data: userForm(nguoiDung),
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
