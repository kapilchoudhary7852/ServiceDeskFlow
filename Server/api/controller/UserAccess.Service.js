const db = require('_helpers/db');
const UserAccess = db.UserAccess;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await UserAccess.find({ IsActive : true });
}

async function getById(id) {
    return await UserAccess.findById(id);
}

async function create(userAccessParam) {
    const userAccess = new UserAccess(userAccessParam);
    await userAccess.save();
}

async function update(id, userAccessParam) {
    const userAccess = await UserAccess.findById(id);
    // validate
    if (!userAccess) throw 'User Access not found';
    Object.assign(userAccess, userAccessParam);
    await userAccess.save();
}

async function _delete(id) {
    await UserAccess.findByIdAndRemove(id);
}