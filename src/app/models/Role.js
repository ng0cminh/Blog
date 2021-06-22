const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaRole = new Schema({
   name: {
      type: String,
   },
});

module.exports = new mongoose.model('roles', SchemaRole);
