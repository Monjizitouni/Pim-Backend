const config = require('config.json');
const mongoose = require('mongoose');
// const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
// // mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
// // mongoose.Promise = global.Promise;

module.exports = {
    Matiere: require('../models/matiere.model'),
    Presence: require('../models/presence.model'),
    Note: require('../models/note.model')
};