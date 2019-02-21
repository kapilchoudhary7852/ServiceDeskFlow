const db = require('_helpers/db');
const ServiceRequest = db.ServiceRequest;
const ServiceRequestHostory = require('../controller/ServiceRequestHistory.Service');
const NotifyTo = require('../controller/NotifyTo.service');

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
   let Sdata =  await serviceRequest.save();
    if(Sdata._id != null)
         {
           await NotifyTo.create(serviceRequestParam.NotifyTo,Sdata._id);
           await ServiceRequestHostory.create(serviceRequestParam,Sdata._id);
         }
 }

async function update(id, serviceRequestParam) {
    const serviceRequest = await ServiceRequest.findById(id);
    
    // validate
    if (!serviceRequest) throw 'Service Request not found';
    Object.assign(serviceRequest, serviceRequestParam);
    let Sdata = await serviceRequest.save();
    
    if(Sdata._id != null && serviceRequestParam.IsActive == true)
    {
        NotifyTo.deleteMultiple(Sdata._id); 
        await NotifyTo.create(serviceRequestParam.NotifyTo,Sdata._id);    
    }
}

async function _delete(id) {
    await ServiceRequest.findByIdAndRemove(id);
}