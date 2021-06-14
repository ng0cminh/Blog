const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchemaUser = new Schema(
   {
      userId: {
         type: Number,
      },
      firstName: {
         type: String,
         maxLength: 50,
      },
      lastName: {
         type: String,
         maxLength: 50,
      },
      userName: {
         type: String,
         maxLength: 25,
      },
      email: {
         type: String,
      },
      password: {
         type: String,
      },
      niceName: {
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
