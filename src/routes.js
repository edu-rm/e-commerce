const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */
const ProductController = require("./app/controllers/ProductController")
routes.get('/', function(req,res){
  res.render("layout.njk")
})

routes.get('/products/create', ProductController.create )

routes.get('/ads/create', function(req, res){
  return res.redirect("/products/create")
})


module.exports= routes