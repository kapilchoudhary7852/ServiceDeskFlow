const role_routes=require('./routes/Role.routes');
const serviceDesk_routes=require('./routes/ServiceDesk.routes');
const servicePriority_routes=require('./routes/ServicePriority.routes');
const serviceRequest_routes=require('./routes/ServiceRequest.routes');
const serviceRequestHistory_routes=require('./routes/ServiceRequestHistory.routes');
const serviceStatus_routes=require('./routes/ServiceStatus.routes');
const user_routes=require('./routes/user.routes');
const userAccess_routes=require('./routes/UserAccess.routes');
module.exports = {
   role_routes,
   serviceDesk_routes,
   servicePriority_routes,
   serviceRequest_routes,
   serviceRequestHistory_routes,
   serviceStatus_routes,
   user_routes,
   userAccess_routes,
};
