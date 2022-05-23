const express = require('express');
const router = express.Router();
const noteService = require('../services/note.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', _delete);
router.put('/:id', update);
router.get('/getnote/:etudiant/:matiere', getEtudiant);

module.exports = router;

function create(req, res, next) {
    noteService.create(req.body)
        .then(note => note ? res.json(note): res.status(200).json({ message: 'note added successfully' }))
        .catch(err => next(err));
}

function getEtudiant(req, res, next) {
    noteService.getByEtudiant(req.params.etudiant , req.params.matiere)
        .then(note => res.json(note))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    noteService.getAll()
        .then(note => res.json(note))
        .catch(err => next(err));
}

function getById(req, res, next) {
    noteService.getById(req.params.id)
        .then(note => note ? res.json(note) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    noteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    noteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}