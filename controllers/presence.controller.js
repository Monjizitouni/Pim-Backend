const express = require('express');
const router = express.Router();
const presenceService = require('../services/presence.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', _delete);
router.put('/:id', update);
router.post('/getpre', getEtudiant);
router.post('/getabs', getEtudiantAbs);

module.exports = router;


function create(req, res, next) {
    presenceService.create(req.body)
        .then(presence => presence ? res.json(presence): res.status(200).json({ message: 'presence added successfully' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    presenceService.getAll()
        .then(presence => res.json(presence))
        .catch(err => next(err));
}

function getEtudiant(req, res, next) {
    presenceService.getByEtudiantMat(req.body.etudiant , req.body.matiere)
        .then(presence => res.json(presence))
        .catch(err => next(err));
}
function getEtudiantAbs(req, res, next) {
    presenceService.getByEtudiantMatABS(req.body.etudiant , req.body.matiere)
        .then(presence => res.json(presence))
        .catch(err => next(err));
}
function getById(req, res, next) {
    presenceService.getById(req.params.id)
        .then(presence => presence ? res.json(presence) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    presenceService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    presenceService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}