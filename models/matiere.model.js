const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   NameM: { type: String, required: true },
    NbHeures: { type: String, required: true },
    ECTs: { type: String, required: true },
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe'
        }
    
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
      
    }
});

module.exports = mongoose.model('Matiere', schema);