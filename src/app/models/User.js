const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaUser = new Schema(
   {
      name: {
         type: String,
         maxLength: 255,
      },
      password: {
         type: String,
      },
      niceName: {
         type: String,
      },
      email: {
         type: String,
      },
      status: {
         type: String,
      },
   },
   {
      timestamps: true,
   },
);

module.exports = new mongoose.model('users', SchemaUser);
