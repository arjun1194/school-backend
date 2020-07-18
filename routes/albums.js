const express = require('express')
const router = express.Router();

const Album = require('../models/Album')
const Photo = require('../models/Photo')
const s3 = require('../config/s3');


//create album
router.post('/create', (req,res,next)=>{
    new Album({
        title:req.body.title,
        description: req.body.description,
        coverImage: req.body.coverImage,
        uploadedBy: req.body.uploadedBy,
    })
        .save()
        .then(()=>res.status(201).json({message:'Album Successfully Created!'}))
        .catch(err=>next(err))
});

router.delete('/delete/:albumId', (req,res,next)=>{
    Photo.findAll({where:{albumId:req.params.albumId}}).then(photos=>{
        photos.map(photo=>{
            const params = {Bucket: 'namannewbucket', Key: photo.storageId};
            s3.deleteObject(params, function(err, data) {
                if (err){next(err)}
                photo.destroy();
            });
        })
    }).catch(err=>next(err))
    Album.destroy({where:{id:req.params.albumId}}).then(status=>{
        (status)?res.status(202).json({message:'Album Successfully deleted!'}):res.status(404).json({message:'Resource not found'})
    }).catch(err=>next(err))
})

router.get('/all', (req,res,next)=>{
    Album
        .findAll()
        .then(albums=>res.json(albums))
        .catch(err=>next(err))
});

router.get('/:id', (req,res,next)=>{
   Album
       .findByPk(req.params.id,{include:'photos'})
       .then(album=>res.json(album))
       .catch(err=>next(err))
});

router.patch('/setCoverImage/:albumId',(req,res,next)=>{
    Album.update(
        { coverImage: req.body.coverImage },
        { where: { id: req.params.albumId } })
        .then((result)=>{
            (result===1)?res.status(200).json('Cover Image set successfully'):
                res.status(404).json('Album with given id was not found')
        })
        .catch(err =>next(err))
})



module.exports = router;

