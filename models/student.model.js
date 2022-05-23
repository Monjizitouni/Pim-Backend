const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cin: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    classe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Classe' },
    photo: { type: String }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('Student', schema);
