const express = require('express');
const router = express.Router();
const path = require('path');
const DatVe = require(path.resolve('models/DatVe.js'));
const Tour = require(path.resolve('models/Tour.js'));
const { formDatVe } = require(path.resolve('modules/mixin.js'));

router.get('/', async (req, res) => {
    try {
        const listVe = await DatVe.find();
        const listTour = await Tour.find();
        const result = [];
        listVe.forEach((ve) => {
            const tour = listTour.find((t) => t.ma == ve.maTour);
            result.push(formDatVe(ve, tour));
        });
        return res.json({
            data: result,
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
