const Category = require("../models/Category")
const Product = require("../models/Product")
const { formatPrice } = require("../../lib/utils")
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
  async post(req,res){
    const keys = Object.keys(req.body)
    
    for (key of keys){
      if(req.body[key] == ""){
        return res.send("Please fill all the fields")
      }
    }

    let results = await Product.insert(req.body)
    const productId = results.rows[0].id


    return res.redirect(`/products/${productId}/edit`)

  },
  async edit(req,res){

    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if(!product) return res.send("Product not found")

    product.price = formatPrice(product.price)
    

    results = await Category.all()
    const categories = results.rows

    return res.render('products/edit', {product, categories})


  },
  async put(req,res){
    const keys = Object.keys(req.body)

    for (key of keys){
      if(key == ""){
        return res.send("Please, fill all the filds")
      }
    }

    let {id, category_id, user_id, name, description ,price, old_price, quantity, status} = req.body
    
    price = price.replace(/\D/g, "")

    if(price !== old_price){
      const oldPrice = await Product.find(id)
      old_price = oldPrice.rows[0].price
    }
    

    const values = [
      category_id,
      1 || user_id,
      name,
      description,
      old_price,
      price,
      quantity,
      status,
      id
    ]


    const product = await Product.update(values)
    
    return res.redirect(`products/${id}/edit`)

  }
}