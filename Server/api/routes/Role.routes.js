const express = require('express');
const router = express.Router();
const roleService = require('../controller/Roles.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    roleService.create(req.body)
        .then(role => res.json(role))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    roleService.getAll()
        .then(roles => res.json(roles))
        .catch(err => next(err));
}

function getById(req, res, next) {
    roleService.getById(req.params.id)
        .then(role => role ? res.json(role) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    roleService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}