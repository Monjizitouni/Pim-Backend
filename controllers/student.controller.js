const express = require('express');
const router = express.Router();
const studentService = require('../services/student.service');
const multer = require('multer');



// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/nb', getNbStudentByClasse);
router.get('/current', getCurrent);
router.get('/classe/:classeId', getByClasse);
router.get('/:id', getById);
router.delete('/:id', _delete);
router.post('/mailstudent', mailstudent);

module.exports = router;

 
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage: storage});

router.post('/uploadstudents', upload.single("uploadfile"), (req, res) =>{
    studentService.importStudents( './uploads/' + req.file.filename);
    res.json({
        'message': 'File uploaded/import successfully!', 'file': req.file
    });
});


function authenticate(req, res, next) {
    studentService.authenticate(req.body)
        .then(student => student ? res.json(student) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    studentService.create(req.body)
        .then(student => student ? res.json(student): res.status(200).json({ message: 'sign up success' }))
        .catch(err => next(err));
}

function mailstudent(req, res, next){
    
    var recipientmail= req.body.mail
    var subject= req.body.subject
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
      subject: '[Note Notfication ]',
      text: 'Your no'+subject,
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
        
      }
    });
     //sendResponse(res, ResponseCodes.fileUploaded, files);
    }



function getAll(req, res, next) {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
    studentService.getAll(condition)
        .then(students => res.json(students))
        .catch(err => next(err));
}

function getByClasse(req, res , next){
    studentService.getByClasse(req.params.classeId)
        .then(student => student ? res.json(student) : res.sendStatus(404))
        .catch(err => next(err));
}

function getNbStudentByClasse(req, res, next) {
    studentService.getNbStudentByClasse()
        .then(students => res.json(students))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    studentService.getById(req.student.sub)
        .then(student => student ? res.json(student) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    studentService.getById(req.params.id)
        .then(student => student ? res.json(student) : res.sendStatus(404))
        .catch(err => next(err));
}

router.put('/:id', (req, res, next) =>{
    studentService.update(req.params.id, req.body)
        .then(student => student ? res.json(student) : res.sendStatus(404))
        .catch(err => next(err));
})

router.put('/photo/:id', upload.single("photo"), (req, res, next) =>{
    studentService.updatephoto(req.params.id, req.body,req.file.filename)
        .then(() => res.json({}))
        .catch(err => next(err));
})

function _delete(req, res, next) {
    studentService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}