const express = require('express');
const router = express.Router();
const UserAccessService = require('../controller/UserAccess.Service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.get('/getbySid/:id', getBySId);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    UserAccessService.create(req.body)
        .then(userAccess => res.json(userAccess))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    UserAccessService.getAll()
        .then(userAccess => res.json(userAccess))
        .catch(err => next(err));
}

function getById(req, res, next) {
    UserAccessService.getById(req.params.id)
        .then(userAccess => userAccess ? res.json(userAccess) : res.sendStatus(404))
        .catch(err => next(err));
}
function getBySId(req, res, next) {
    UserAccessService.getBySId(req.params.id)
        .then(userAccess => userAccess ? res.json(userAccess) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    UserAccessService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    UserAccessService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}