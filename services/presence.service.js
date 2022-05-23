const config = require('config.json');
const db = require('_helpers/db');
const Presence = require('../models/presence.model');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByEtudiantMat
};

async function getAll() {
    return await Presence.find().populate({path:'etudiant'}).populate({path:'matiere'});
}


async function getById(id) {
    return await Presence.findById(id).populate({path:'etudiant'}).populate({path:'matiere'});
}

async function getByEtudiantMat(etudiant , matiere ) {
    return await Presence.find({NomEtudiant : etudiant , matiere : matiere }).populate({path:'student'}).populate({path:'matiere'});
}




async function create(presenceParam) {
    const presence = new Presence(presenceParam);

    await presence.save();
}


async function _delete(id) {
    await Presence.findByIdAndRemove(id);
}

async function update(id, presenceParam) {
    const presence = await Presence.findById(id);
    Object.assign(presence, presenceParam);

    await presence.save();
}