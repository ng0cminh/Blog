const mongoose = require('mongoose');
const Role = require('../../app/models/Role');

function initial() {
   Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
         new Role({
            name: 'user',
         }).save((err) => {
            if (err) {
               console.log('error', err);
            }
            console.log("added 'user' to roles collection");
         });
         new Role({
            name: 'moderator',
         }).save((err) => {
            if (err) {
               console.log('error', err);
            }
            console.log("added 'moderator' to roles collection");
         });
         new Role({
            name: 'admin',
         }).save((err) => {
            if (err) {
               console.log('error', err);
            }
            console.log("added 'admin' to roles collection");
         });
      }
   });
}

async function connect() {
   try {
      await mongoose.connect(process.env.DB_HOST, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,
      });
      initial();
      console.log('Connect MongooseDB Sucesfully!!!');
   } catch (error) {
      console.log('Connect MongoDB Failuer!!!');
      process.exit(1);
   }
}

module.exports = { connect };
