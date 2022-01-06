const express = require('express');
const router = express.Router();
const path = require('path');
const { bulkSave } = require('../../models/Tour');
const Tour = require(path.resolve('models/Tour.js'));

router.get('/', async (req, res) => {
    return res.json('Xoa tour API');
});

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    try {
        if (reqMa == null) {
            return res.json({
                success: false,
            });
        }

        const tour = await Tour.findOne({
            ma: reqMa,
        });

        if (tour == null) {
            return res.json({
                success: false,
            });
        }

        await Tour.findOneAndDelete({
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
