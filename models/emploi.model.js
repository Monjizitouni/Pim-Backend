const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    date: { type: Date, required: true }, 
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe'
        },
    
    prof: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher'
        },

    NomMatiere: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Matiere'
       },

       
});
// classe: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Classe' },

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
      
    }
});

module.exports = mongoose.model('Emploi', schema);