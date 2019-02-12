const db = require('_helpers/db');
const Roles = db.Roles;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Roles.find({});
}

async function getById(id) {
    return await Roles.findById(id);
}

async function create(roleParam) {
    // validate
    if (await Roles.findOne( { "Name" : roleParam.Name})) {
        throw 'Role name "' + roleParam.Name + '" is already exist';
    }

    const role = new Roles(roleParam);
    await role.save();
}

async function update(id, roleParam) {
    const role = await Roles.findById(id);
    // validate
    if (!role) throw 'Role not found';
    if (role.Name !== roleParam.Name && await Roles.findOne({ Name: roleParam.Name })) {
        throw 'Role name "' + roleParam.Name + '" is already exist';
    }
    Object.assign(role, roleParam);
    await role.save();
}

async function _delete(id) {
    await Roles.findByIdAndRemove(id);
}