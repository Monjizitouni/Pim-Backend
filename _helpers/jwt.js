// const expressJwt = require('express-jwt');
// const config = require('config.json');
// const studentService = require('../services/student.service');

// module.exports = jwt;

// function jwt() {
//     const secret = config.secret;
//     return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
//         path: [
//             // public routes that don't require authentication
//             '/students/authenticate',
//             '/students/register'
//         ]
//     });
// }

// async function isRevoked(req, payload, done) {
//     const student = await studentService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!student) {
//         return done(null, true);
//     }

//     done();
// };