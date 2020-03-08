const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */

routes.get('/', function(req,res){
  res.render("layout.njk")
})


module.exports= routes