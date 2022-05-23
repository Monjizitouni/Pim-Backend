const express = require('express');
const router = express.Router();
const emploiService = require('../services/emploi.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/getprof/:prof', getbyprof);
router.get('/getprofclasse/:prof/:classe', getbyprofclasse);
router.post('/getemp', getByclasse);
router.get('/getempE/:matiere/:classe', getbymatiereclasse);



module.exports = router;

function create(req, res, next) {
    emploiService.create(req.body)
        .then(emploi => emploi ? res.json(emploi): res.status(200).json({ message: 'emploi added successfully' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    emploiService.getAll()
        .then(emploi => res.json(emploi))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    emploiService.getById(req.student.sub)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    emploiService.getById(req.params.id)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
}
function getbyprof(req, res, next) {
    emploiService.getbyprof(req.params.prof)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
        
}
function getByclasse(req, res, next) {
    emploiService.getByclasse(req.body.classe)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
    
    }
function getbyprofclasse(req, res, next) {
    emploiService.getbyprofclasse(req.params.prof, req.params.classe)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
}
function getbymatiereclasse(req, res, next) {
    emploiService.getbymatiereclasse(req.params.matiere, req.params.classe)
        .then(emploi => emploi ? res.json(emploi) : res.sendStatus(404))
        .catch(err => next(err));
}


function update(req, res, next) {
    emploiService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    emploiService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
