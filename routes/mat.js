const express = require('express')
const  router = express.Router()



const Mat  = require('../controllers/matiere.controller')



 
router.post('/create', Mat.create);
router.get('/', Mat.getAll);
router.get('/current', Mat.getCurrent);
router.get('/:id', Mat.getById);
router.put('/:id', Mat.update);
router.delete('/:id', Mat. _delete);
router.get('/getbyclasse/:idclasse', Mat.getbyclasse);


module.exports= router