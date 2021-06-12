const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchemaUser = new Schema(
   {
      userId: {
         type: Number,
      },
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
   },
   {
      timestamps: true,
   },
);

SchemaComment.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = new mongoose.model('users', SchemaUser);
