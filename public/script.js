
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
  uploadLimit : 6,
  handleFileInput(event){
    const {files : fileList } = event.target
    
    const { uploadLimit } = PhotosUpload
    const photoPreview = document.querySelector('#photos-preview')
    
    if(fileList.length > uploadLimit){
      alert(`Você pode enviar até ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }
    Array.from(fileList).forEach(file =>{
      const reader = new FileReader()

      reader.onload = ()=>{
        const img = new Image()/*<img> */
        img.src = String(reader.result)

        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = () => alert('cliquei')
        
        div.appendChild(img)
        photoPreview.appendChild(div)

      }

      reader.readAsDataURL(file)
    })

  }
}


