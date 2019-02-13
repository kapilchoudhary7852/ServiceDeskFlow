const express = require('express');
const router = express.Router();
const serviceDeskService = require('../controller/ServiceDesk.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    serviceDeskService.create(req.body)
        .then(serviceDesc => res.json(serviceDesc))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    serviceDeskService.getAll()
        .then(serviceDesc => res.json(serviceDesc))
        .catch(err => next(err));
}

function getById(req, res, next) {
    serviceDeskService.getById(req.params.id)
        .then(serviceDesc => serviceDesc ? res.json(serviceDesc) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    serviceDeskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    serviceDeskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}