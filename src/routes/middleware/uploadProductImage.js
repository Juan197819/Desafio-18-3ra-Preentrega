import multer from 'multer';

let imgProducto = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./views/img/productos')
    },
    filename:(req,file,cb)=>{
      cb(null,`${file.originalname}`)
    }
  })
  const uploadProduct = multer({storage:imgProducto})
  export default uploadProduct