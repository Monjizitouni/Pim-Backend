const express = require('express');
const router = express.Router();
const classeService = require('../services/classe.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/nv', getByNiveau);
router.get('/:id', getById);
router.delete('/:id', _delete);
router.put('/:id', update);

module.exports = router;


function create(req, res, next) {
    classeService.create(req.body)
        .then(classe => classe ? res.json(classe): res.status(200).json({ message: 'class added successfully' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    classeService.getAll()
        .then(classe => res.json(classe))
        .catch(err => next(err));
}

function getByNiveau(req, res, next) {
    classeService.getByNiveau()
        .then(classe => res.json(classe))
        .catch(err => next(err));
}

function getById(req, res, next) {
    classeService.getById(req.params.id)
        .then(classe => classe ? res.json(classe) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    classeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    classeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}