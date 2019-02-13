const db = require('_helpers/db');
const ServiceDesk = db.ServiceDesk;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ServiceDesk.find({ IsActive : true });
}

async function getById(id) {
    return await ServiceDesk.findById(id);
}

async function create(serviceDeskParam) {
    // validate
    if (await ServiceDesk.findOne( { "Name" : serviceDeskParam.Name})) {
        throw 'Service Desk name "' + serviceDeskParam.Name + '" is already exist';
    }
    const serviceDesk = new ServiceDesk(serviceDeskParam);
    await serviceDesk.save();
}

async function update(id, serviceDeskParam) {
    const serviceDesk = await ServiceDesk.findById(id);
    // validate
    if (!serviceDesk) throw 'Service Desc not found';
    if (serviceDesk.Name !== serviceDeskParam.Name && await ServiceDesk.findOne({ Name: serviceDeskParam.Name })) {
        throw 'Priority name "' + serviceDescParam.Name + '" is already exist';
    }
    Object.assign(serviceDesk, serviceDeskParam);
    await serviceDesk.save();
}

async function _delete(id) {
    await ServiceDesk.findByIdAndRemove(id);
}