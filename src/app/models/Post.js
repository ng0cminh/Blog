const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const SchemaPost = new Schema(
   {
      _id: { type: Number },
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
      _id: false,
      timestamps: true,
   },
);

// Custom query helper
SchemaPost.query.sortable = function (req) {
   if (req.query.hasOwnProperty('_sort')) {
      const isValidtype = ['asc', 'desc'].includes(req.query.type);
      return this.sort({
         [req.query.column]: isValidtype ? req.query.type : 'desc',
      });
   }
   return this;
};

// add plugin
mongoose.plugin(slug);
SchemaPost.plugin(AutoIncrement);
SchemaPost.plugin(mongoose_delete, {
   deletedAt: true,
   overrideMethods: 'all',
});

module.exports = new mongoose.model('posts', SchemaPost);
