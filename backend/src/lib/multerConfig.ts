import multer from "multer";
import path from "path";

const postStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/posts/')
    },
    filename: function(req, file, cb){
        console.log(file)
        const extension = path.extname(file.originalname)
        const name = path.basename(file.originalname, extension)
        cb(null, `${name}-${Date.now()}${extension}`)
    }
});

export const uploadPostImage = multer({storage: postStorage})

const userStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/users/')
    },
    filename: function(req, file, cb){
        console.log(file)
        const extension = path.extname(file.originalname)
        const name = path.basename(file.originalname, extension)
        cb(null, `${name}-${Date.now()}${extension}`)
    }
});

export const uploadUserImage = multer({storage: userStorage})

