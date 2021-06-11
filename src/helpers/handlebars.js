const Handlebars = require('handlebars');
module.exports = {
   sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';
      const icons = {
         default: 'bi-chevron-expand',
         asc: 'bi-sort-down-alt',
         desc: 'bi-sort-down',
      };
      const types = {
         default: 'desc',
         asc: 'desc',
         desc: 'asc',
      };
      const icon = icons[sortType];
      const type = types[sortType];

      const href = Handlebars.escapeExpression(
         `?_sort&column=${field}&type=${type}`,
      );
      const output = `<a href="${href}"><i class="bi ${icon}"></i></a>`;
      return new Handlebars.SafeString(output);
   },
};
