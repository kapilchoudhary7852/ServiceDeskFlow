const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ServiceRequestId: { type: String, required: true },
    ServiceDeskId: { type: String, required: true },
    PriorityId: { type: String, required: true },
    IssueTitle: { type: String, required: true },
    Comment: { type: String, required: true },
    Status: { type: String, required: true },
    NotifyTo:{ type: String, required: true  },
    CreatedBy: { type: String, required: true },
    CreatedDate: { type: Date,default: Date.now},
    Assigned: { type: String },
    IsActive: { type: Boolean, default: true,required:true },
});
module.exports = mongoose.model('ServiceRequestHistory', schema);