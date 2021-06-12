const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SchemaComment = new Schema(
   {
      commentId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      content: {
         type: String,
      },
   },
   {
      timestamps: true,
   },
);

SchemaComment.plugin(AutoIncrement, { inc_field: 'commentId' });

module.exports = new mongoose.model('comments', SchemaComment);
