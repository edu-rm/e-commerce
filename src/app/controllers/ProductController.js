const Category = require("../models/Category")
module.exports = {
  create(req, res){
    // Pegar categorias
    Category.all()
    .then(function(results){
      categories = results.rows
      return res.render('products/create', {categories})
    }).catch(function(err){
      throw new Error(err)
    })
  },
  post(req,res){

  }
}