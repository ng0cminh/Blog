const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const SchemaPost = new Schema(
   {
      title: {
         type: String,
      },
      slug: {
         type: String,
         slug: 'title',
         unique: true,
      },
      description: {
         type: String,
         maxLength: 600,
      },
      content: {
         type: String,
      },
      postStatus: {
         type: String,
         enum: ['active', 'pedding', 'delete'],
      },
      commentStatus: {
         type: String,
         enum: ['open', 'close'],
      },
      featured: {
         type: Boolean,
         default: false,
      },
      image: {
         type: String,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: 'users',
      },
   },
   {
      timestamps: true,
   },
);

// add plugin
mongoose.plugin(slug);
SchemaPost.plugin(mongoose_delete, {
   deletedAt: true,
   overrideMethods: 'all',
});

module.exports = new mongoose.model('posts', SchemaPost);
