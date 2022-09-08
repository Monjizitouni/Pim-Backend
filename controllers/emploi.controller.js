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
router.post('/cron', cron);



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
function mailteacher(mail, subject){
    
    var recipientmail= mail
    console.log(recipientmail)
    var fname=''
    var nodemailer = require('nodemailer');
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'CopyAndPasteSpotter@gmail.com',
        pass: 'yoajpehdcsytcyds'
      }
    });
    
    var mailOptions = {
      from: 'CopyAndPasteSpotter@gmail.com',
      to: recipientmail,
      subject: '[teacher Reminder ]',
      text: 'You have a class about '+subject+ ' after 15 min',
      
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
        
      }
    
    });
    return res.status.send("eafezf")
};
    
  function cron(req, res, next){
  
   
    var subject = req.body.subject
    var cron = require('node-cron');
  
  cron.schedule('*/59,45 8-17 * 6-9 1-5',  () => {
    var recipientmail = req.body.mail;
        console.log(recipientmail)
        var fname=''
        var nodemailer = require('nodemailer');
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'CopyAndPasteSpotter@gmail.com',
            pass: 'yoajpehdcsytcyds'
          }
        });
        
        var mailOptions = {
          from: 'CopyAndPasteSpotter@gmail.com',
          to: recipientmail,
          subject: '[Teacher Reminder ]',
          text: 'Bonjour \nVous avez une classe sur '+subject+ 'après 15 minutes\n Cordialement',
          
        };
      
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent');
            
          }
        
        });
        return res.status.send("eafezf")
    })
  }
