const config = require("../config/auth.config");
const express = require('express');
const db = require('_helpers/db');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/teacher.model');
const Role = require('../models/role.model');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post('/signup', signup);
module.exports = router;

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

function signup (req, res, next){
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'bassemjellali1995@outlook.com',
        pass: '02052007@@@'
    }
    });
    const tempPassword = makeid(8);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cin: req.body.cin,
    salary: req.body.salary,
    type: req.body.type,
    password: bcrypt.hashSync(tempPassword, 8),
    subjects: req.body.subjects
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // if (req.body.roles) {
    //   Role.find(
    //     {
    //       name: { $in: req.body.roles }
    //     },
    //     (err, roles) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       user.roles = roles.map(role => role._id);
    //       user.save(err => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }

    //         res.send({ message: "User was registered successfully!" });
    //       });
    //     }
    //   );
    // } else {
    //   Role.findOne({ name: "user" }, (err, role) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }

    //     user.roles = "user";
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          const mailOptions = {
            from: 'School administration',
            to: user.email,
            subject: 'Welcome to our platform',
            text: "This is your password: " + tempPassword
            };
            transporter.sendMail(mailOptions)

         return res.send({ message: "User was registered successfully!" });
        });
      });
    }
 // });
  
//};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
