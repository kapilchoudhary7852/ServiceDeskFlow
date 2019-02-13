const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    UserId: { type: String, unique: true, required: true },
    ServiceDeskId: {type: String,required: true},
});
module.exports = mongoose.model('UserAccess', schema);