const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaCategory = new Schema({
   name: {
      type: String,
   },
});

module.exports = new mongoose.model('categories', SchemaCategory);