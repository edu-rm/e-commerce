
const Mask = {
  apply(input, func){
    setTimeout(function(){
      input.value = Mask[func](input.value)
    },1)
  },
  formatBRL(value){

    value = value.replace(/\D/g,"")

    return value = new Intl.NumberFormat('pt-BR', {
      style : 'currency',
      currency : 'BRL'
    }).format(value/100)

  }
}

const PhotosUpload = {
  input : "",
  preview: document.querySelector('#photos-preview'),
  uploadLimit : 6,
  files : [],
  handleFileInput(event){
    PhotosUpload.input = event.target
    const {files : fileList } = event.target

    if (PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file =>{
      PhotosUpload.files.push(file)

      
      const reader = new FileReader() /*IMG blob */
      

      reader.onload = ()=>{
        const img = new Image()/*<img> */
        img.src = String(reader.result)

        const div = PhotosUpload.getContainer(img)

        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()

  },
  hasLimit(event){
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList} = input

    if(fileList.length > uploadLimit){
      alert(`Você pode enviar até ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    const photosDiv = []
    preview.childNodes.forEach(item =>{
      if(item.classList && item.classList.value == 'photo' ){
        photosDiv.push(item)
      }
    })

    const totalPhotos = fileList.length + photosDiv.length
    
    if(totalPhotos> uploadLimit){
      alert(`Você atingiu o limite máximo de ${uploadLimit} fotos`)
      event.preventDefault
      return true
    }

    return false
  },
  getAllFiles(){
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
    
    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(img){

    const div = document.createElement('div')

    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhoto

    div.appendChild(img)
    div.appendChild(PhotosUpload.getRemoveButton())
    return div
  },
  getRemoveButton(){
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = 'close'
    return button
  },
  removePhoto(event){
    const photoDiv = event.target.parentNode // <div class photo> pai do <i>
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
    
    photoDiv.remove()


  }
}


