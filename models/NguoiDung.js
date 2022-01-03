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
        type: String
    }
});

module.exports = mongoose.model('NguoiDung', ConversationRoomSchema);
