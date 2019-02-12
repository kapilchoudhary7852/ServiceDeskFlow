const db = require('_helpers/db');
const ServiceStatus = db.ServiceStatus;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ServiceStatus.find({});
}

async function getById(id) {
    return await ServiceStatus.findById(id);
}

async function create(serviceStatusParam) {
    // validate
    if (await ServiceStatus.findOne( { "Name" : serviceStatusParam.Name})) {
        throw 'Status name "' + serviceStatusParam.Name + '" is already exist';
    }
    const serviceStatus = new ServiceStatus(serviceStatusParam);
    await serviceStatus.save();
}

async function update(id, serviceStatusParam) {
    const serviceStatus = await ServiceStatus.findById(id);
    // validate
    if (!serviceStatus) throw 'Priority not found';
    if (serviceStatus.Name !== serviceStatusParam.Name && await ServicePriority.findOne({ Name: serviceStatusParam.Name })) {
        throw 'Status name "' + serviceStatusParam.Name + '" is already exist';
    }
    Object.assign(serviceStatus, serviceStatusParam);
    await serviceStatus.save();
}

async function _delete(id) {
    await ServiceStatus.findByIdAndRemove(id);
}