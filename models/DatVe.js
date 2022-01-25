const mongoose = require('mongoose');

const ConversationRoomSchema = mongoose.Schema({
    ma: {
        // mã đơn đặt vé
        type: String,
        require: true,
    },
    maTour: {
        type: Number,
        require: true,
    },
    ten: {
        type: String,
        require: true,
    },
    cccd: {
        type: String,
        require: true
    },
    soDT: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    diaChi: {
        type: String,
        require: true,
    },
    ghiChu: {
        type: String,
        default: '',
    },
    thoiGianDat: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('DatVe', ConversationRoomSchema);
