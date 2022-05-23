const config = require('config.json');
const db = require('_helpers/db');
const Note = require('../models/note.model');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByEtudiant
};

async function getAll() {
    return await Note.find().populate({path:'etudiant'}).populate({path:'matiere'});
}


async function getById(id) {
    return await Note.findById(id).populate({path:'etudiant'}).populate({path:'matiere'});
}

async function getByEtudiant(etudiant , matiere) {
    return await Note.find({etudiant : etudiant , matiere : matiere}).populate({path:'Etudiant'}).populate({path:'matiere'}).populate({path:'classe'});
}


async function create(noteParam) {
    const note = new Note(noteParam);

    await note.save();
}


async function _delete(id) {
    await Note.findByIdAndRemove(id);
}

async function update(id, noteParam) {
    const presence = await Note.findById(id);
    Object.assign(presence, noteParam);

    await Note.save();
}