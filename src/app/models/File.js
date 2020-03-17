const db = require('../../config/db')
const fs = require('fs')

module.exports = {
  insert({filename, path, product_id}){
  


    const query = `
      INSERT INTO files (
        name,
        path,
        product_id
      ) VALUES ($1 , $2, $3)
      RETURNING id
    `
    
    const values = [
      filename,
      path,
      product_id
    ]
    return db.query(query, values)
  },
  async delete(id){
    
    try{

      const results = await db.query(`SELECT * FROM files WHERE id = $1` , [id])
      const file = results.rows[0]    
  
      fs.unlinkSync(file.path)

    }catch(err){
      throw err
    }
   

    db.query(`
      DELETE FROM files WHERE id = $1
    `,[id])
  }

}