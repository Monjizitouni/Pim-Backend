const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Matiere = db.Matiere;

module.exports = {
   
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getbyclasse
};


async function getAll() {
    return await Matiere.find();
}

async function getById(id) {
    return await Matiere.findById(id);
}

async function getbyclasse(classe) {
    // validate
    return await Matiere.find({ classe: classe});
        
    }

    async function getbyclasse(classe) {
        // validate
        return await Matiere.find({ classe: classe}).populate({path:'NomMatiere'});
            
        }

async function create(matiereParam) {
    // validate
    if (await Matiere.findOne({ NameM: matiereParam.NameM })) {
        throw 'Matiere "' + matiereParam.NameM + '" is already Exist';
    }

 let matiere= Matiere(matiereParam)
// save Matiere
    await matiere.save();



}

async function update(id, matiereParam) {
    const matiere = await Matiere.findById(id);

    // validate
    if (!matiere) throw 'Matiere not found';
    if (matiere.NameM !== matiereParam.NameM && await Matiere.findOne({ NameM: matiereParam.NameM })) {
        throw 'Name "' + matiereParam.email + '" is already exist';
    }

    // copy matiereParam properties to Matiere
    Object.assign(matiere, matiereParam);

    await matiere.save();
}

async function _delete(id) {
    await Matiere.findByIdAndRemove(id);
}