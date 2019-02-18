const db = require('_helpers/db');
const UserAccess = db.UserAccess;

module.exports = {
    getAll,
    getById,
    getBySId,
    create,
    update,
    delete: _delete,
    deleteMultiple: _deleteMultiple
};

async function getAll() {
    return await UserAccess.find();
}

async function getById(id) {
    return await UserAccess.findById(id);
}
async function getBySId(id) {
    return await UserAccess.find({ ServiceDeskId : id });
}

async function create(userAccessParam,serviceDeskId) {
    for (var i = 0; i < userAccessParam.length; i++) {
    const userAccess = new UserAccess({
      UserId:  userAccessParam[i]._id,
      ServiceDeskId: serviceDeskId,
    });
    await userAccess.save();
 }
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
async function _deleteMultiple(id) {
    await UserAccess.remove({ ServiceDeskId: id});
}