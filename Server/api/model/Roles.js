const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Name: { type: String, required: true, unique: true  },
    CreatedBy: { type: String, required: true },
    CreatedDate: { type: Date, default: Date.now },
    Description: { type: String, required: true },
    IsActive: { type: Boolean, default: true,required:true },
});
module.exports = mongoose.model('Roles', schema);