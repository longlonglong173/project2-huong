const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

const ConversationRoomSchema = mongoose.Schema({
    name: {
        // tên bảng
        type: String,
        require: true,
    },
    currentId: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('IdList', ConversationRoomSchema);
