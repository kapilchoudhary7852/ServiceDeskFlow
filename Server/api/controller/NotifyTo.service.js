const db = require('_helpers/db');
const NotifyTo = db.NotifyTo;

module.exports = {
    getAll,
    getById,
    getBySId,
    getByUId,
    create,
    update,
    delete: _delete,
    deleteMultiple:_deleteMultiple
};

async function getAll() {
    return await NotifyTo.find({});
}

async function getById(id) {
    return await NotifyTo.findById(id);
}

async function create(Param,id) {
  for (var i = 0; i < Param.length; i++) {
    const notifyTo = new NotifyTo({
      ServiceRequestId: id,
      UserId: Param[i]._id,
    });
    let result = await notifyTo.save();
    if(result._id!=null)
     return true;
 }
}
async function getBySId(id) {
    return await NotifyTo.find({ ServiceRequestId : id });
}
async function getByUId(id) {
    return await NotifyTo.find({ UserId : id });
}
async function update(id, Param) {
    const notifyTo = await NotifyTo.findById(id);
    // validate
    if (!notifyTo) throw 'User not found';
    if (notifyTo.UserId !== Param.UserId && await User.findOne({ UserId: Param.UserId })) {
        throw 'UserId "' + Param.UserId + '" is already exist';
    }
    Object.assign(notifyTo, Param);
    let result = await notifyTo.save();
    if(result._id!=null)
     return true;
}
 async function _delete(id) {
    await NotifyTo.findByIdAndRemove(id);
 }

 async function _deleteMultiple(id) {
    console.log(id)
    await NotifyTo.remove({ ServiceRequestId: id});
}
