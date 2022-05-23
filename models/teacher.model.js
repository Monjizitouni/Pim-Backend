const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cin: { type: String, required: true },
    salary: { type: Number, required: true },
    type: { type: String, required: true },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matiere"
      }
    ]
  })


schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
    
  }
});

module.exports = mongoose.model('Teacher', schema);