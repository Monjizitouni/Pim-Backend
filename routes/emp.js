const express = require('express')
const  router = express.Router()



const Emp  = require('../controllers/emploi.controller')



 
router.post('/create', Emp.create);
router.get('/', Emp.getAll);
router.get('/current', Emp.getCurrent);
router.get('/:id', Emp.getById);
router.put('/:id', Emp.update);
router.delete('/:id', Emp. _delete);
router.post('/getemp', getbyclasse);
router.post('/getempE/:matiere/:classe', getbymatiereclasse);


module.exports= router