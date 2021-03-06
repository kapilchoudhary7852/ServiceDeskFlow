﻿const db = require('_helpers/db');
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getSession
};

async function getAll() {
    return await User.find({});
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne( { "UserId" : userParam.UserId } )    ) {
        return 'UserId "' + userParam.UserId + '" is already Exit';
    }
    const user = new User(userParam);
    let result = await user.save();
    if(result._id!=null)
     return true;
}

async function update(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.UserId !== userParam.UserId && await User.findOne({ UserId: userParam.UserId })) {
        return 'UserId "' + userParam.UserId + '" is already exist';
    }
    Object.assign(user, userParam);
    let result = await user.save();
    if(result._id!=null)
     return true;
}
async function _delete(id) {
    await User.findByIdAndRemove(id);
}
async function getSession(id) {
    let res = id.split('_');
    return await User.find({UserId : res[0]});
}