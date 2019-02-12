const express = require('express');
const router = express.Router();
const serviceStatusService = require('../controller/ServiceStatus.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    serviceStatusService.create(req.body)
        .then(serviceStatus => res.json(serviceStatus))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    serviceStatusService.getAll()
        .then(serviceStatus => res.json(serviceStatus))
        .catch(err => next(err));
}

function getById(req, res, next) {
    serviceStatusService.getById(req.params.id)
        .then(serviceStatus => serviceStatus ? res.json(serviceStatus) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    serviceStatusService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    serviceStatusService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}