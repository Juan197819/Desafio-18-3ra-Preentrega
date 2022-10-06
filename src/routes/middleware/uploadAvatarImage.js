import multer from 'multer';

let avatar = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./views/img/avatares')
    },
    filename:(req,file,cb)=>{
      cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
  const upload = multer({storage:avatar})
  
  export default upload