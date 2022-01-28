const express = require('express');
const router = express.Router();
const path = require('path');
const NguoiDung = require(path.resolve('models/NguoiDung.js'));
const { userForm } = require(path.resolve('modules/mixin.js'));

router.get('/', async (req, res) => {
    const reqIndex = req.query.index || 0;
    const reqCount = req.query.count || 20;
    try {
        const userList = await NguoiDung.find();
        if (reqIndex >= userList.length) {
            return res.status(400).json({
                success: false,
                message: 'No data',
            });
        }
        const userListCopy = userList.slice(reqIndex);
        const result = userListCopy.map((user) => userForm(user));
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
