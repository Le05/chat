const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws= require("aws-sdk");
const multerS3 = require('multer-s3')

const storageTypes ={
    local:multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,path.resolve(__dirname,"..","..","uploads","imagens"));
        },
        filename:(req,file,cb) => {
            crypto.randomBytes(16,(err,hash) =>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,file.key);
            });
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'app-vmodel/imagens',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key:(req,file,cb) =>{
            crypto.randomBytes(16,(err,hash) =>{
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,filename);
            });
        }     
    })
}


module.exports = {
    dest:path.resolve(__dirname,"..","..","uploads","imagens"),
    storage: storageTypes["s3"],
    limits:{
        fileSize: 5 * 1024 * 1024
    },
    fileFilter:(req,file,cb)=>{
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/pjpeg",
            "image/gif",
            "application/octet-stream"

        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error("Tipo de arquivo invalido"))
        }
    }
}





/*module.exports = {
    dest:path.resolve(__dirname,"..","..","uploads","imagens"),
    storage:multer.diskStorage({
        destination:(req,file,cb) =>{
            cb(null,path.resolve(__dirname,"..","..","uploads","imagens"));
        },
        filename:(req,file,cb) => {
            crypto.randomBytes(16,(err,hash) =>{
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null,filename);
            });
        },
    }),
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter:(req,file,cb)=>{
        const allowedMimes = [
            "image/jpeg",
            "image/png",
            "image/pjpeg",
            "image/gif",
            "application/octet-stream"
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error("Tipo de arquivo invalido"))
        }
    }
} */