const express = require('express');
const router = express.Router();
const path = require('path');
// const IdList = require(path.resolve('models/IdList.js'));
// const Tour = require(path.resolve('models/Tour.js'));
const DatVe = require(path.resolve('models/DatVe.js'));

// 1. phần trăm
// 2. tour nào
//

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
};

router.post('/', async (req, res) => {
    try {
        const listVe = await DatVe.find();
        const data = groupBy(listVe, 'maTour');
        return res.json({
            data: data,
            success: true,
        });
    } catch {
        return res.json({
            success: false,
        });
    }
});

module.exports = router;
