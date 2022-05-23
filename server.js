require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const mongoose  = require('mongoose')
const config = require("./config.json");
const authcontroller= require("./controllers/auth.controller");



mongoose.connect(config.connectionString,{useNewUrlParser : true , useUnifiedTopology:true})
const db  = mongoose.connection

db.on('error',(err) =>{
    console.log(err)
} )

db.once('open', ()=> {
    console.log('DB Connection Estabblished !')
})





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/presence', require('./controllers/presence.controller'));
app.use('/auth', authcontroller);
app.use('/matiere', require('./controllers/matiere.controller'));
app.use('/note', require('./controllers/note.controller'));
app.use('/emploi', require('./controllers/emploi.controller'));
app.use('/students', require('./controllers/student.controller'));
app.use('/classes', require('./controllers/classe.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});