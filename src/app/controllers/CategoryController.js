const Category = require('../models/Category');
const arraysToObject = require('../../utils/mongoose');

class CategoryController {
      // [GET] /blog/category
      index (req, res, next) {
         return res.render('me/category', {
            title: 'Category',
            layout: 'me',

         })
      }
      // [GET] /blog/category
      new (req, res, next) {
         return res.render('me/category', {
            title: 'Category',
            layout: 'me',
   
         })
      }
   
      // [POST] /blog/category
      async create (req, res, next) {
         const category = new Category({name: req.body.name});
         try {
            await category.save()
            res.json({
               success: true,
               massage: 'thanh cong'
            })
         } catch (error) {
            console.log(error)
            res.status(500).json({
               success: false,
               message: 'loi hệ thống',

            })
         }
      }
}

module.exports = new CategoryController();
