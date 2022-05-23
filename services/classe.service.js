const config = require("../config.json");
const db = require('../_helpers/db');
const Classe = require('../models/classe.model');


module.exports = {
    getAll,
    getByNiveau,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    var mysort = { name: 1 };
    return await Classe.find().sort(mysort);
}

async function getByNiveau(){
    return await Classe.aggregate(
        [
            { "$group": {
                "_id": "$niveau",
                "nbClasse": { "$sum": 1 },
                "niveau": { $first: "$niveau" }
                }
            }
        ],
        function(err,docs) {
           if (err) console.log(err);
           console.log( docs );
        }
    );
}


async function getById(id) {
    return await Classe.findById(id);
}


async function create(classeParam) {
    const classe = new Classe(classeParam);

    classe.name=classeParam.niveau+classeParam.branche+classeParam.numero;

    if (await Classe.findOne({ name: classe.name })) {
        console.log(classe.name +' already exist');
        throw classe.name +'already exist';
    }

    await classe.save();
}


async function _delete(id) {
    await Classe.findByIdAndRemove(id);
}

async function update(id, classeParam) {
    const classe = await Classe.findById(id);
    Object.assign(classe, classeParam);

    await classe.save();
}