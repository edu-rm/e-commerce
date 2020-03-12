const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */
const multer = require('./app/middlewares/multer')
const ProductController = require("./app/controllers/ProductController")



routes.get('/', function(req,res){
  res.render("layout.njk")
})

routes.get('/products/create', ProductController.create )
routes.post('/products', multer.array["photos", 6], ProductController.post)
routes.get('/products/:id/edit',multer.array["photos", 6], ProductController.edit)
routes.put('/products', ProductController.put)
routes.delete('/products', ProductController.delete)


//alias
routes.get('/ads/create', function(req, res){
  return res.redirect("/products/create")
})



module.exports= routes