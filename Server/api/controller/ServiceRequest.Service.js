const db = require('_helpers/db');
const ServiceRequest = db.ServiceRequest;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ServiceRequest.find({ IsActive : true });
}

async function getById(id) {
    return await ServiceRequest.findById(id);
}

async function create(serviceRequestParam) {
   const serviceRequest = new ServiceRequest(serviceRequestParam);
   await serviceRequest.save();
}

async function update(id, serviceRequestParam) {
    const serviceRequest = await ServiceRequest.findById(id);
    // validate
    if (!serviceRequest) throw 'Service Request not found';
    Object.assign(serviceRequest, serviceRequestParam);
    await serviceRequest.save();
}

async function _delete(id) {
    await ServiceRequest.findByIdAndRemove(id);
}