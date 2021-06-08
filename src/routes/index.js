const siteRouter = require('./site');
const meRouter = require('./me');
const blogRouter = require('./blog');

function router(app) {
   app.use('/blog', blogRouter);

   app.use('/me', meRouter);

   app.use('/', siteRouter);

   // Khi gặp lỗi 404
   app.use(function (req, res, next) {
      res.status(404);
      res.render('404');
   });
   // Khi gặp lỗi 500
   app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500);
      res.render('500', { layout: false });
   });
}

module.exports = router;
