const db = require('_helpers/db');
const NotifyTo = db.NotifyTo;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await NotifyTo.find({});
}

async function getById(id) {
    return await NotifyTo.findById(id);
}

async function create(Param,id) {
  console.log(Param);
   for (var i = 0; i < Param.length; i++) {
    const notifyTo = new NotifyTo({
      ServiceRequestId: id,
      UserId: Param[i]._id,
    });
    console.log(notifyTo);
    await notifyTo.save();
 }
}
async function update(id, Param) {
    const notifyTo = await NotifyTo.findById(id);
    // validate
    if (!notifyTo) throw 'User not found';
    if (notifyTo.UserId !== Param.UserId && await User.findOne({ UserId: Param.UserId })) {
        throw 'UserId "' + Param.UserId + '" is already exist';
    }
    Object.assign(notifyTo, Param);
    await notifyTo.save();
}
 async function _delete(id) {
    await NotifyTo.findByIdAndRemove(id);
 }