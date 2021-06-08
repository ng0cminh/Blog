const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaComment = new Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      postId: {
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

module.exports = new mongoose.model('comments', SchemaComment);
