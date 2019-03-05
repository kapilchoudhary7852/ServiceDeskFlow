const db = require('_helpers/db');
const ServiceRequest = db.ServiceRequest;
const ServiceRequestHostory = require('../controller/ServiceRequestHistory.Service');
const NotifyTo = require('../controller/NotifyTo.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    updateAssginee,
    delete: _delete
};

async function getAll() {
    return await ServiceRequest.find({ IsActive : true }).sort({"CreatedDate": -1});
}

async function getById(id) {
    return await ServiceRequest.findById(id);
}

async function create(serviceRequestParam) {
   const serviceRequest = new ServiceRequest(serviceRequestParam);
   serviceRequest.Assigned=null;
   serviceRequest.AssignedDate=null;
   serviceRequest.ResolvedDate=null;
   serviceRequest.Comment=null;
   let Sdata =  await serviceRequest.save();
   if(Sdata._id != null){
     await NotifyTo.create(serviceRequestParam.NotifyTo,Sdata._id);
     await ServiceRequestHostory.create(serviceRequestParam,Sdata._id);
     return true;
    }
 }

async function update(id, serviceRequestParam) {
    const serviceRequest = await ServiceRequest.findById(id);
    if (serviceRequestParam.Assigned ){
        serviceRequestParam.AssignedDate = Date.now();
    }
    else{
        serviceRequestParam.AssignedDate = null;
    }
    // validate
    if (!serviceRequest) throw 'Service Request not found';
    Object.assign(serviceRequest, serviceRequestParam);
    let Sdata = await serviceRequest.save();
    if(Sdata._id != null && serviceRequestParam.IsActive == true)
    {
        serviceRequestParam.CreatedBy = serviceRequest.CreatedBy;
        NotifyTo.deleteMultiple(Sdata._id); 
        await NotifyTo.create(serviceRequestParam.NotifyTo,Sdata._id);  
        await ServiceRequestHostory.create(serviceRequestParam,Sdata._id);
        return true;
    }
}

async function updateAssginee(id, serviceRequestParam) {
    const serviceRequest = await ServiceRequest.findById(id);
    if (!serviceRequest) throw 'Service Request not found';
    if (serviceRequestParam.Assigned )
        serviceRequestParam.AssignedDate = Date.now();
    // validate
    Object.assign(serviceRequest, serviceRequestParam);
    let Sdata = await serviceRequest.save();
    if(Sdata._id != null && serviceRequestParam.IsActive == true){
            await ServiceRequestHostory.create(serviceRequestParam,Sdata._id);
            return true;
      }
}

async function _delete(id) {
    await ServiceRequest.findByIdAndRemove(id);
}