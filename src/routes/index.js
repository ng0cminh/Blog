const siteRouter = require('./site');
const meRouter = require('./me');
const blogRouter = require('./blog');
const usersRouter = require('./users');
const categoryRouter = require('./category');

const sortMiddleware = require('../app/middlewares/sortMiddleware');
const verifyLogin = require('../app/middlewares/verifyLogin');

function router(app) {
   // Ussage Middlewart
   app.use(sortMiddleware);
   app.use(verifyLogin);

   app.use('/blog', blogRouter);

   app.use('/category', categoryRouter);

   app.use('/me', meRouter);

   app.use('/users', usersRouter);

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
