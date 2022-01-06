const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));

router.get('/', async (req, res) => {
    return res.json('Xoa Nguoi Dung API');
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

        await NguoiDung.findOneAndDelete({
            ma: reqMa,
        });

        return res.json({
            success: true,
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
