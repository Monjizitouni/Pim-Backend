const express = require('express')
const  router = express.Router()



const pre  = require('../controllers/presence.controller')



 
router.post('/create', pre.create);
router.get('/', pre.getAll);
router.get('/:id', pre.getById);
router.delete('/:id', pre._delete);
router.put('/:id', pre.update);
router.post('/getpre', getEtudiant);
router.get('/:id', pre.getById);
router.get('/mailstudent/:mail', mailstudent);



module.exports= router