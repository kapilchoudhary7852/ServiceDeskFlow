const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    UserId: { type: String, required: true },
    Fname: { type: String, required: true },
    Lname: { type: String},
    RoleId: {type: String,required: true},
});
module.exports = mongoose.model('User', schema);