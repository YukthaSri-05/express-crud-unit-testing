const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  marks: { type: Number, required: true },
  skills: [String]
});

module.exports = mongoose.model('Marks', marksSchema);
