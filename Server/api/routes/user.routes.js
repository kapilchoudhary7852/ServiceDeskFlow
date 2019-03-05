const express = require('express');
const router = express.Router();
const userService = require('../controller/user.service');

// user routes
router.post('/create', create);
router.get('/get/all', getAll);
router.get('/get/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);
router.get('/getSession/:id', getSession);
router.post('/login', login);

module.exports = router;

function create(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function login(req, res, next) {
    console.log();
    userService.login(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function getSession(req, res, next) {
    userService.getSession(req.params.id)
      .then(user => res.json(user))
      .catch(err => next(err));
}