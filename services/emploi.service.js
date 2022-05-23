const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Emploi = require ('../models/emploi.model')


module.exports = {
   
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getbyprof,
    getbyprofclasse,
    getByclasse,
    getbymatiereclasse
}


async function getAll() {
    return await Emploi.find().populate({path:'classe'}).populate({path:'NomMatiere'}).populate({path:'teacher'});
}

async function getById(id) {
    return await Emploi.findById(id).populate({path:'classe'}).populate({path:'NomMatiere'}).populate({path:'teacher'});
}

async function getbyprof(prof) {
    // validate
    return await Emploi.find({ prof: prof}).populate({path:'classe'}).populate({path:'NomMatiere'});
        
    }
async function getbyprofclasse(prof,classe) {
        // validate
        return await Emploi.find({ prof: prof,classe: classe}).populate({path:'classe'}).populate({path:'NomMatiere'});
            
        }
async function getbymatiereclasse(matiere,classe) {
            // validate
                        return await Emploi.find({ NomMatiere: matiere,classe: classe}).populate({path:'classe'}).populate({path:'NomMatiere'});
                
            }

async function getByclasse(classe) {
            return await Emploi.find({classe : classe }).populate({path:'Matiere'});
        }


async function create(emploiParam) {
    // validate
    if (await Emploi.findOne({ NomMatiere: emploiParam.NomMatiere, classe : emploiParam.classe, date : emploiParam.date })) {
        throw 'Matiere "' + emploiParam.NomMatiere + '" is already Exist';
    }

 let emploi =  Emploi(emploiParam);
// save Matiere
    await emploi.save();



}

async function update(id, emploiParam) {
    const emploi = await Emploi.findById(id);

    // validate
    if (!emploi) throw 'Matiere not found';
    if (emploi.NomMatiere !== emploiParam.NomMatiere && await Emploi.findOne({ NomMatiere: emploiParam.NomMatiere })) {
        throw 'Name "' + emploiParam.email + '" is already exist';
    }

    // copy emploiParam properties to Emploi
    Object.assign(emploi, emploiParam);

    await emploi.save();
}

async function _delete(id) {
    await emploi.findByIdAndRemove(id);
}