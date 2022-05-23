const config = require("../config.json");
const jwt = require('jsonwebtoken');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const nodemailer = require('nodemailer');
const Student = require('../models/student.model');
const Classe = require('../models/classe.model');

module.exports = {
    authenticate,
    getAll,
    getNbStudentByClasse,
    getById,
    getByClasse,
    create,
    update,
    updatephoto,
    importStudents,
    sendCreationMail,
    delete: _delete
};


async function importStudents(filePath){
    // -> Read Excel File to Json Data
    const result = excelToJson({
        sourceFile: filePath,
        sheets:[{
        
            // Excel Sheet Name
            name: 'Students',
 
            // Header Row -> be skipped and will not be present at our result object.
            header:{
               rows: 1
            },
			
            // Mapping columns to keys
            columnToKey: {
                A: 'cin',
                B: 'firstName',
                C: 'lastName',
                D: 'email',
                E: 'birthDate'
            }
        }]
        
    });
 
    // -> Log Excel Data to Console
    console.log(result);

    result.Students.forEach(stu => {        
        const student = new Student(stu);
        const pass = student.firstName.charAt(0)+student.cin+student.lastName.charAt(0)
        student.password = bcrypt.hashSync(pass);
        student.firstName = stu.firstName.charAt(0).toUpperCase() + stu.firstName.slice(1);
        student.lastName = stu.lastName.charAt(0).toUpperCase() + stu.lastName.slice(1);
        student.photo = "profile.png"
        student.save();   
        sendCreationMail(student.email);
    });
}

async function authenticate({ email, password }) {
    const student = await Student.findOne({ email }).populate({path:'classe'});
    if (student && bcrypt.compareSync(password, student.password)) {
        const token = jwt.sign({ sub: student.id }, config.secret, { expiresIn: '7d' });
        return await{
            student,
            token,
            message: 'login success'
        };
    }
}

async function getAll(condition) {
    return await Student.find(condition).populate({path:'classe'});
}

async function getByClasse(classeId){
    return await Student.find( { classe: { $eq: classeId } } ).populate({path:'classe'});
}

async function getNbStudentByClasse(){
    const students= await Student.aggregate(
        [
            { "$group": {
                "_id": "$classe",
                "nbStudents": { "$sum": 1 }
                }
            }
        ],
        function(err,docs) {
           if (err) console.log(err);
           console.log( docs );
        }
    );
    await Classe.populate(students, {path: "_id"});
    return students;
}

async function getById(id) {
    return await Student.findById(id).populate("classe");
}

async function create(studentParam) {
    // validate
    if (await Student.findOne({ email: studentParam.email })) {
        throw 'email "' + studentParam.email + '" is already taken';
    }

    const student = new Student(studentParam);

    studentParam.password=studentParam.firstName.charAt(0)+studentParam.cin+studentParam.lastName.charAt(0)
    student.photo = "profile.png"

    // hash password
    if (studentParam.password) {
        student.password = bcrypt.hashSync(studentParam.password, 10);
    }

    student.firstName = studentParam.firstName.charAt(0).toUpperCase() + studentParam.firstName.slice(1)
    student.lastName = studentParam.lastName.charAt(0).toUpperCase() + studentParam.lastName.slice(1);

    // save Student
    await student.save();
    sendCreationMail(student.email);



}

async function update(id, studentParam) {
    
    
    const student = await Student.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    }).populate("classe");
    

    // validate
    if (student.email !== studentParam.email && await Student.findOne({ email: studentParam.email })) {
        throw 'Email "' + studentParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (studentParam.password) {
        studentParam.password = bcrypt.hashSync(studentParam.password, 10);
    }

    // copy StudentParam properties to Student
    Object.assign(student, studentParam);

    await student.save();
    return await Student.findById(student.id).populate("classe");
}

async function updatephoto(id, studentParam,filename) {
    const student = await Student.findById(id);

    if (filename) {
        studentParam.photo = filename;
    }

    // copy StudentParam properties to Student
    Object.assign(student, studentParam);

    await student.save();
}

async function _delete(id) {
    await Student.findByIdAndRemove(id);
}

function sendCreationMail(tomail){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'esprit.kpi2022@gmail.com',
          pass: 'esprit2022'
        },
        tls: {
            rejectUnauthorized: false
        }
      });
      
      var mailOptions = {
        from: 'esprit.kpi2022@gmail.com',
        to: tomail,
        subject: 'Esprit-KPI account',
        text: 'Your Esprit-kpi account has been created. \nEmail : ' +tomail+ '\nPassword : first lettre of your first name + cin + first lettre of your last name\nPlease try to login and change your password.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}