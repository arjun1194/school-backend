const express = require('express')
const router = express.Router();
const multer =require('multer')

const uuid=require('uuid')
const Photo = require('../models/Photo')
const Album  = require('../models/Album');
const s3 = require('../config/s3');



const storage =multer.memoryStorage({
    destination:function(req,file,callback){
        callback(null,'')
    },
})

const upload= multer({storage}).single('image')


router.post('/upload',upload,(req,res,next)=>{
    let albumId = req.query.albumId;
    Album
        .findByPk(albumId)
        .then(album=>{

            if(!album){res.status(404).json({message:'Album doesnt exist'})}
            else{
                let myFile=req.file.originalname.split(".")
                const fileType=myFile[myFile.length-1];
                const params={
                    Bucket:'namannewbucket',
                    Key: `${uuid.v4()}`,
                    Body: req.file.buffer,
                    ACL:'public-read'
                };
                s3.upload(params,(error,data)=>{
                    if(error){next(error);}
                    else{
                        new Photo({imageUrl:data.Location,storageId:data.Key,albumId:album.id})
                            .save()
                            .then((photo)=>res.json({message:'Photo Uploaded Sucessfully',photoId:photo.id}))
                            .catch(err=>next(err.message))
                    }})
            }

        })
        .catch(err=>next(err))





})

router.delete('/delete/:photoId',(req,res,next)=>{

    Photo
        .findByPk(req.params.photoId)
        .then(photo=>{
            const params = {
                Bucket: 'namannewbucket',
                Key: photo.storageId
            };
            s3.deleteObject(params, function(err, data) {
                if (err){next(err)}
                photo.destroy().then(()=>{
                    res.json({message:'Photo was deleted!'})
                }).catch(err=>next(err))
            });
        })
        .catch(err=>next(err))



});



module.exports = router;
