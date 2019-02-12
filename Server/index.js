require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// api routes for users
app.use('/api/users', require('./api/routes/user.routes'));
// api routes for roles
app.use('/api/roles', require('./api/routes/Role.routes'));
// api routes for service priority
app.use('/api/priority', require('./api/routes/ServicePriority.routes'));
// api routes for service status
app.use('/api/status', require('./api/routes/ServiceStatus.routes'));
app.use(errorHandler);
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
