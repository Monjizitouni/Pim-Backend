const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   Grades: { type: String, required: true },
    Observation: String,
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe',
        required: true },
        matiere: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Matiere',
            required: true },
    etudiant: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Etudiant',
            required: true },
 
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
      
    }
});

module.exports = mongoose.model('Note', schema);