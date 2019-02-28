const express = require('express');
const router = express.Router();
const serviceRequestHistoryService = require('../controller/ServiceRequestHistory.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.get('/getallforsr/:id', getByServiceRequestId);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    serviceRequestHistoryService.create(req.body)
        .then(serviceRequestHistory => res.json(serviceRequestHistory))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    serviceRequestHistoryService.getAll()
        .then(serviceRequestHistory => res.json(serviceRequestHistory))
        .catch(err => next(err));
}

function getById(req, res, next) {
    serviceRequestHistoryService.getById(req.params.id)
        .then(serviceRequestHistory => serviceRequestHistory ? res.json(serviceRequestHistory) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByServiceRequestId(req, res, next) {
    serviceRequestHistoryService.getByServiceRequestId(req.params.id)
        .then(serviceRequestHistory => serviceRequestHistory ? res.json(serviceRequestHistory) : res.sendStatus(404))
        .catch(err => next(err));1
}

function update(req, res, next) {
    serviceRequestHistoryService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    serviceRequestHistoryService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}