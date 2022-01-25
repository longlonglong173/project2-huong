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
    },
    phuongTien: {
        type: String,
        require: true,
    },
    gia: {
        type: Number,
        require: true,
    },
    diaDiem: {
        type: String,
        require: true,
    },
    hinhAnh: {
        type: Array,
    },
    slot: {
        type: Number
    }
});

module.exports = mongoose.model('Tour', ConversationRoomSchema);
