const express = require('express')
const  router = express.Router()



const note  = require('../controllers/note.controller')



 
router.post('/create', note.create);
router.get('/', note.getAll);
router.get('/:id', note.getById);
router.delete('/:id',note. _delete);
router.put('/:id', note.update);
router.post('/getnote', getEtudiant);


module.exports= router