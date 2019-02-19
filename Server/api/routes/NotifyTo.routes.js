const express = require('express');
const router = express.Router();
const NotifyToService = require('../controller/NotifyTo.service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.get('/getbySid/:id', getBySId);
router.get('/getbyUid/:id', getByUId);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    NotifyToService.create(req.body)
        .then(x => res.json(x))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    NotifyToService.getAll()
        .then(x => res.json(x))
        .catch(err => next(err));
}

function getById(req, res, next) {
    NotifyToService.getById(req.params.id)
        .then(x => x ? res.json(x) : res.sendStatus(404))
        .catch(err => next(err));
}
function getBySId(req, res, next) {
    NotifyToService.getBySId(req.params.id)
        .then(x => x ? res.json(x) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByUId(req, res, next) {
    NotifyToService.getBySId(req.params.id)
        .then(x => x ? res.json(x) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    NotifyToService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    NotifyToService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}