const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    Roles: require('../api/model/Roles'),
    ServicePriority: require('../api/model/ServicePriority'),
    ServiceStatus: require('../api/model/ServiceStatus'),
};