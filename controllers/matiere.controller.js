const express = require('express');
const router = express.Router();
const matiereService = require('../services/matiere.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/getbyclasse/:idclasse', getbyclasse);

module.exports = router;

function create(req, res, next) {
    matiereService.create(req.body)
        .then(matiere => matiere ? res.json(matiere): res.status(200).json({ message: 'matiere added successfully' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    matiereService.getAll()
        .then(matiere => res.json(matiere))
        .catch(err => next(err));
}

function getbyclasse(req, res, next) {
    matiereService.getbyclasse(req.params.idclasse)
        .then(matiere => res.json(matiere))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    matiereService.getById(req.student.sub)
        .then(matiere => matiere ? res.json(matiere) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    matiereService.getById(req.params.id)
        .then(matiere => matiere ? res.json(matiere) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    matiereService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    matiereService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
