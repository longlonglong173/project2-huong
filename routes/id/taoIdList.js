const express = require('express');
const router = express.Router();
const path = require('path');
const IdList = require(path.resolve('models/IdList.js'));

router.post('/', async (req, res) => {
    const reqTen = req.body.ten || null;
    try {
        if (reqTen == null) {
            return res.json({
                success: false,
            });
        }

        const isDuplicateId = await IdList.findOne({
            name: reqTen,
        });
        if (isDuplicateId != null) {
            return res.json({
                success: false,
            });
        }

        const newId = new IdList({
            name: reqTen,
        });

        await newId.save();

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
