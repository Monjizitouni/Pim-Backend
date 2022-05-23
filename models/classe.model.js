const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    niveau: { type: Number, required: true },
    branche: { type: String, required: true },
    numero: { type: Number, required: true },
    name: { type: String, required: true},
    nbEtudiant: { type: Number, required: true },
    year: { type: String, required: true }
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});



module.exports = mongoose.model('Classe', schema);