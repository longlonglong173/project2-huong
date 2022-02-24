const express = require('express');
const router = express.Router();
const path = require('path');
const IdList = require(path.resolve('models/IdList.js'));
const Tour = require(path.resolve('models/Tour.js'));
const DatVe = require(path.resolve('models/DatVe.js'));
const { formDatVe } = require(path.resolve('modules/mixin.js'));

router.post('/', async (req, res) => {
    const reqMaTour = req.body.maTour || null;
    // thong tin nguoi dung
    const reqUuid = req.body.uuid || null;
    const reqTen = req.body.ten || null;
    const reqEmail = req.body.email || null;
    const reqSoDT = req.body.soDT || null;
    const reqDiaChi = req.body.diaChi || null;
    const reqGhiChu = req.body.ghiChu || '';
    const reqCccd = req.body.cccd || null;
    try {
        if (
            reqMaTour == null ||
            reqTen == null ||
            reqEmail == null ||
            reqSoDT == null ||
            reqDiaChi == null ||
            reqCccd == null
        ) {
            return res.status(400).json({
                success: false,
            });
        }

        const tour = await Tour.findOne({
            ma: reqMaTour,
        });
        if (tour == null) {
            return res.status(400).json({
                success: false,
            });
        }

        if (tour.slot <= 0) {
            return res.status(400).json({
                success: false,
                message: 'No Slot',
            });
        }

        const currentId = await IdList.findOne({
            name: 'DatVe',
        });
        const count = currentId.currentId + 1;

        const ve = new DatVe({
            ma: count,
            maTour: reqMaTour,
            uuid: reqUuid || null,
            ten: reqTen,
            cccd: reqCccd,
            email: reqEmail,
            soDT: reqSoDT,
            diaChi: reqDiaChi,
            ghiChu: reqGhiChu,
            thoiGianDat: Date.now(),
        });

        currentId.currentId = count;
        await currentId.save();
        await ve.save();

        tour.slot = tour.slot - 1;
        await tour.save();

        return res.status(200).json({
            data: formDatVe(ve, tour),
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
