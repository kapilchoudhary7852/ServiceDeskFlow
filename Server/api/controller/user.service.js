const db = require('_helpers/db');
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await User.find({});
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne( { "email" : { $regex : new RegExp(userParam.email, "i") } } )    ) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}