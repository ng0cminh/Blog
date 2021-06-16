require('dotenv').config();
// Import path library
const path = require('path');

// Import express library
const express = require('express');

// Import methodOverride library
const methodOverride = require('method-override');

// Import express handlebars
const handlebars = require('express-handlebars');

// Import Connect MongoDB
const db = require('./config/db');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

// Import Router
const router = require('./routes');

const app = express();

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

db.connect();

app.use(
   express.urlencoded({
      extended: true,
   }),
);
app.use(express.json());
app.engine(
   'hbs',
   handlebars({
      extname: '.hbs',
      helpers: require('./helpers/handlebars'),
   }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Ussage Middlewart
app.use(sortMiddleware);

// Ussage Router
router(app);

// Set and Listen ${port}
const port = 3000;
app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
});
