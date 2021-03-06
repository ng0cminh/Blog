const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaUser = new Schema(
   {
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
         unique: true,
         maxLength: 25,
      },
      email: {
         type: String,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      nicename: {
         type: String,
      },
      roles: [
         {
            type: Schema.Types.ObjectId,
            ref: 'roles',
         },
      ],
   },
   {
      timestamps: true,
   },
);

module.exports = new mongoose.model('users', SchemaUser);
