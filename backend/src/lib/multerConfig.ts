import multer from "multer";
import path from "path";

const postStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/posts/')
    },
    filename: function(req, file, cb){
        console.log(file)
        const extension = path.extname(file.originalname)
        const name = path.basename(file.originalname, extension)
        cb(null, `${name}-${Date.now()}${extension}`)
    }
});

export const uploadPostImage = multer({storage: postStorage})

const userImagesStorage = multer.diskStorage({
    destination: function(req, file, cb){
        const isProfile = file.fieldname === 'profileImage';
        const folder = isProfile ? 
            'public/users/profileImages/' :
            'public/users/backgroundImages/' 
        cb(null, folder)
    },
    filename: function(req, file, cb){
        console.log(file)
        const extension = path.extname(file.originalname)
        const name = path.basename(file.originalname, extension)
        cb(null, `${name}-${Date.now()}${extension}`)
    }
});

export const uploadUserImages = multer({storage: userImagesStorage})


