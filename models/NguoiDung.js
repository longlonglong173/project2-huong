const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

const ConversationRoomSchema = mongoose.Schema({
    maSoDN: {
        type: String,
        require: true,
    },
    matKhau: {
        type: String,
        require: true,
    },
    ten: {
        type: String,
        default: 'nguoi dung',
    },
    ma: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        default: '',
    },
    gioiTinh: {
        type: String,
        default: 'nam',
    },
    soDT: {
        type: String,
    },
    email: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    vai: {
        type: String,
        default: 'CLIENT', // CLIENT , MANAGER
    },
});

module.exports = mongoose.model('NguoiDung', ConversationRoomSchema);
