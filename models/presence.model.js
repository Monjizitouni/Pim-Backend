const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Date: { type: Date, required: true },
    State: { type: String, required: true },
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'classe',
        required: true },
     NomEtudiant :   { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',
        required: true }, 
    matiere :{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Matiere',
        required: true },
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});



module.exports = mongoose.model('Presence', schema);