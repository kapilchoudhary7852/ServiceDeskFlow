const express = require('express');
const router = express.Router();
const servicePriorityService = require('../controller/ServicePriority.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    servicePriorityService.create(req.body)
        .then(servicePriority => res.json(servicePriority))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    servicePriorityService.getAll()
        .then(servicePriority => res.json(servicePriority))
        .catch(err => next(err));
}

function getById(req, res, next) {
    servicePriorityService.getById(req.params.id)
        .then(servicePriority => servicePriority ? res.json(servicePriority) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    servicePriorityService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    servicePriorityService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}