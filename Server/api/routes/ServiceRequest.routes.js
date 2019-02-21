const express = require('express');
const router = express.Router();
const serviceRequestService = require('../controller/ServiceRequest.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    
    serviceRequestService.create(req.body)
        .then(serviceRequest => res.json(serviceRequest))
        .catch(err => next(err,));
}

function getAll(req, res, next) {
    serviceRequestService.getAll()
        .then(serviceRequest => res.json(serviceRequest))
        .catch(err => next(err));
}

function getById(req, res, next) {
    serviceRequestService.getById(req.params.id)
        .then(serviceRequest => serviceRequest ? res.json(serviceRequest) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    serviceRequestService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    serviceRequestService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err,console.log('err:-' + err)));
}