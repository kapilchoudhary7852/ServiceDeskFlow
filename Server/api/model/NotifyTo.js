const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ServiceRequestId: { type: String, required: true },
    UserId: {type: String,required: true},
});
module.exports = mongoose.model('NotifyTo', schema);