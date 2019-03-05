const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ServiceRequestId: { type: String, required: true },
    ServiceDeskId: { type: String, required: true },
    PriorityId: { type: String, required: true },
    IssueTitle: { type: String, required: true },
    Description: { type: String, required: true },
    Status: { type: String },
    CreatedBy: { type: String, required: true },
    CreatedDate: { type: Date,default: Date.now},
    Assigned: { type: String },
    AssignedDate: { type: Date},
    ResolvedDate: { type: Date},
    Comment: { type: String },
    IsActive: { type: Boolean, default: true,required:true },
    Image: { type: String},
});
module.exports = mongoose.model('ServiceRequestHistory', schema);