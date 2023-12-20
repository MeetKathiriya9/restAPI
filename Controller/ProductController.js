import multer from 'multer'
import path from 'path'
import CustomeErrorHandler from '../Service/CustomeErrorHandler.js'

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,"./photos")
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const handlermultipartfile = multer({storage , limits:{fileSize: 10000*450 }})

const productcontroller = {
        store(req, res, next){
            handlermultipartfile(req,res , (err)=>{
                if(err){
                   return next(CustomeErrorHandler.servererror(err.message))
                }
                console.log(req.file)
            })
        }
}

export default productcontroller;