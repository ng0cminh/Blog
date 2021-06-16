const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchemaUser = new Schema(
   {
      userId: {
         type: Number,
      },
      firstname: {
         type: String,
         maxLength: 50,
      },
      lastname: {
         type: String,
         maxLength: 50,
      },
      username: {
         type: String,
         required: true,
         maxLength: 25,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      nicename: {
         type: String,
      },
   },
   {
      timestamps: true,
   },
);

// add plugin

SchemaUser.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = new mongoose.model('users', SchemaUser);
