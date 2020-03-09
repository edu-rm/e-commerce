const db = require('../../config/db')

module.exports = {
  insert(data){
    const query = `
      INSERT INTO products (
        category_id,
        user_id,
        name,
        description,
        old_price,
        price, 
        quantity, 
        status
      ) VALUES ($1 , $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `
     
    const price = data.price.replace(/\D/g, "")

    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || price,
      price,
      data.quantity,
      data.status || 1
    ]
    return db.query(query, values)
  },
  find(id){
    return db.query(`SELECT * FROM products WHERE id = $1`, [id])
  }
}