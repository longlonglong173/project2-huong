const express = require('express');
const router = express.Router();
const path = require('path');
const DatVe = require(path.resolve('models/DatVe.js'));

router.post('/', async (req, res) => {
    const reqMa = req.body.ma || null;
    try {
        if (reqMa == null) {
            return res.status(400).json({
                success: false,
            });
        }

        await DatVe.findOneAndDelete({
            ma: reqMa,
        });

        return res.status(200).json({
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
