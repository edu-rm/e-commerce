const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req,file, cb) => {
    let date = Date.now()
    date = date.toString()
    const msg = `${date}-${file.originalname}`
    cb(null,msg)
  }
})

const fileFilter = (req, file, cb) => {
  const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
  .find(accepetedFormat => accepetedFormat == file.mimetype)

  if(isAccepted){
    return cb(null,true)
  }

  return cb(null,false)

}

module.exports = multer({
  storage,
  fileFilter
})