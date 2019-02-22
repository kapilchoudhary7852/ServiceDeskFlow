const db = require('_helpers/db');
const ServiceRequestHistory = db.ServiceRequestHistory;

module.exports = {
    getAll,
    getById,
    create,
    update,
    updateMultiple,
    delete: _delete,
    
};

async function getAll() {
    return await ServiceRequestHistory.find({ IsActive : true });
}

async function getById(id) {
    return await ServiceRequestHistory.findById(id);
}

async function create(serviceRequestHistoryParam,serviceRequestId) {
    console.log(serviceRequestHistoryParam);

    const serviceRequestHistory = new ServiceRequestHistory({
        ServiceRequestId: serviceRequestId,
        ServiceDeskId: serviceRequestHistoryParam.ServiceDeskId,
        PriorityId: serviceRequestHistoryParam.PriorityId,
        IssueTitle: serviceRequestHistoryParam.IssueTitle,
        Description: serviceRequestHistoryParam.Description,
        Status: serviceRequestHistoryParam.Status,
        CreatedBy: serviceRequestHistoryParam.CreatedBy,
        Assigned: serviceRequestHistoryParam.Assigned,
        IsActive: serviceRequestHistoryParam.IsActive,
        Assigned: null,
        AssignedDate: null,
        ResolvedDate: null,
        Comment: null,
    
    });
    console.log(serviceRequestHistory);
    await serviceRequestHistory.save();
}

async function update(id, serviceRequestHistoryParam) {
    const serviceRequestHistory = await ServiceRequestHistory.findById(id);
    // validate
    if (!serviceRequestHistory) throw 'Service Request not found';
    Object.assign(serviceRequestHistory, serviceRequestHistoryParam);
    await serviceRequestHistory.save();
}

async function _delete(id) {
    await serviceRequestHistory.findByIdAndRemove(id);
}

async function updateMultiple(id, serviceRequestHistoryParam) {
    const serviceRequestHistory = await ServiceRequestHistory.findById(id);
    // validate
    if (!serviceRequestHistory) throw 'Service Request not found';
    Object.assign(serviceRequestHistory, serviceRequestHistoryParam);
    await serviceRequestHistory.save();
}