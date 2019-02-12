const db = require('_helpers/db');
const ServicePriority = db.ServicePriority;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ServicePriority.find({});
}

async function getById(id) {
    return await ServicePriority.findById(id);
}

async function create(servicePriorityParam) {
    // validate
    if (await ServicePriority.findOne( { "Name" : servicePriorityParam.Name})) {
        throw 'Priority name "' + servicePriorityParam.Name + '" is already exist';
    }
    const servicePriority = new ServicePriority(servicePriorityParam);
    await servicePriority.save();
}

async function update(id, servicePriorityParam) {
    const servicePriority = await ServicePriority.findById(id);
    // validate
    if (!servicePriority) throw 'Priority not found';
    if (servicePriority.Name !== servicePriorityParam.Name && await ServicePriority.findOne({ Name: servicePriorityParam.Name })) {
        throw 'Priority name "' + servicePriorityParam.Name + '" is already exist';
    }
    Object.assign(servicePriority, servicePriorityParam);
    await servicePriority.save();
}

async function _delete(id) {
    await ServicePriority.findByIdAndRemove(id);
}