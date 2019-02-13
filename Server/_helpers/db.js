const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    Roles: require('../api/model/Roles'),
    ServiceDesk: require('../api/model/ServiceDesk'),
    ServicePriority: require('../api/model/ServicePriority'),
    ServiceRequest: require('../api/model/ServiceRequest'),
    ServiceRequestHistory: require('../api/model/ServiceRequestHistory'),
    ServiceStatus: require('../api/model/ServiceStatus'),
    User: require('../api/model/user.model'),
    UserAccess: require('../api/model/UserAccess'),
};