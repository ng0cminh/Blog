const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaComment = new Schema(
   {
      content: {
         type: String,
      },
      postId: {
         type: Schema.Types.ObjectId,
         ref: 'posts',
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'users',
      }
   },
   {
      timestamps: true,
   },
);


module.exports = new mongoose.model('comments', SchemaComment);
