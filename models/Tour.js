const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

const ConversationRoomSchema = mongoose.Schema({
    ten: {
        type: String,
        require: true,
    },
    ma: {
        type: Number,
        require: true,
    },
    thoiGian: {
        type: Number, // tính theo ngày
        require: true,
    },
    ngayKhoiHanh: {
        type: Date,
        require: true,
    },
    noiKhoiHanh: {
        type: String,
        default: ''
    },
    phuongTien: {
        type: String,
        require: true,
    },
    giaHienTai: {
        type: Number,
        require: true,
    },
    giaCu: {
        type: Number,
        default: 0
    },
    diaDiem: {
        type: String,
        require: true,
    },
    hinhAnh: {
        type: String,
        default: ''
    },
    slot: {
        type: Number,
        default: 0
    },
    chiTiet: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Tour', ConversationRoomSchema);
