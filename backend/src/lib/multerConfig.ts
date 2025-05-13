import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
        console.log(file)
        const extension = path.extname(file.originalname)
        const name = path.basename(file.originalname, extension)
        cb(null, `${name}-${Date.now()}${extension}`)
    }
});

export const upload = multer({storage: storage})

