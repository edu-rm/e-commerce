const Category = require("../models/Category")
const Product = require("../models/Product")
const File = require('../models/File')


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

    if (req.files.lenght == 0) return res.send("Please, send at least one image")
    


    let results = await Product.insert(req.body)
    const productId = results.rows[0].id

    const filesPromise = req.files.map(file => File.insert({
      ...file,
      product_id : productId
    })) // map retorna um array
    await Promise.all(filesPromise)


    return res.redirect(`/products/${productId}/edit`)

  },
  async edit(req,res){

    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if(!product) return res.send("Product not found")

    product.price = formatPrice(product.price)
    

    results = await Category.all()
    const categories = results.rows

    // images
    results = await Product.files(product.id)
    let files = results.rows
    files = files.map(file =>({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('products/edit', {product, categories, files})


  },
  async put(req,res){
    const keys = Object.keys(req.body)

    for (key of keys){
      if(key == "" && key != 'removed_files'){
        return res.send("Please, fill all the filds")
      }
    }

    if(req.body.removed_files){
      const removedFiles = req.body.removed_files.split(",")
    
      removedFiles.splice(-1)

      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)

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

  },
  async delete(req,res){
    const { id } = req.body

    await Product.delete(id)
    res.redirect('/')

  }
}