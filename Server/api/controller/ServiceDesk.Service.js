const db = require('_helpers/db');
const ServiceDesk = db.ServiceDesk;
const UserAccess = require('../controller/UserAccess.Service')
module.exports = {
    getAll,
    gets,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ServiceDesk.find({IsActive : true });
}

async function gets() {
    return await ServiceDesk.find({});
}

async function getById(id) {
    return await ServiceDesk.findById(id);
}

async function create(serviceDeskParam) {
    // validate
    if (await ServiceDesk.findOne( { "Name" : serviceDeskParam.Name})) {
        return 'Service Desk name "' + serviceDeskParam.Name + '" is already exist';
    }
    const serviceDesk = new ServiceDesk({
        Name:  serviceDeskParam.Name,
        AssignedReminder: serviceDeskParam.AssignedReminder,
        CreatedBy:  serviceDeskParam.CreatedBy,
        Description:  serviceDeskParam.Description,
        IsActive:  serviceDeskParam.IsActive,
    });
    let Sdata = await serviceDesk.save();
    if(Sdata._id != null)
      { 
        await UserAccess.create(serviceDeskParam.selectedManager,Sdata._id);
        await UserAccess.create(serviceDeskParam.selectedIRA,Sdata._id);
        await UserAccess.create(serviceDeskParam.selectedSecondary,Sdata._id);
        return true;   
    }
      
}

async function update(id, serviceDeskParam) {
    const serviceDesk = await ServiceDesk.findById(id);
    // validate
    if (!serviceDesk) return 'Service Desc not found';
    if (serviceDesk.Name !== serviceDeskParam.Name && await ServiceDesk.findOne({ Name: serviceDeskParam.Name })) {
        return 'Service Desk name "' + serviceDeskParam.Name + '" is already exist';
    }
    Object.assign(serviceDesk, serviceDeskParam);
    let Sdata = await serviceDesk.save();
    if(Sdata._id != null && serviceDeskParam.IsActive == true)
    { 
        UserAccess.deleteMultiple(Sdata._id); 
        await UserAccess.create(serviceDeskParam.selectedManager,Sdata._id);
        await UserAccess.create(serviceDeskParam.selectedIRA,Sdata._id);
        await UserAccess.create(serviceDeskParam.selectedSecondary,Sdata._id);
        return true;
    }
  }

async function _delete(id) {
    await ServiceDesk.findByIdAndRemove(id);
}