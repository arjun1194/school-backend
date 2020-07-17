const express = require('express');
const router = express.Router();
const Album = require('../models/Album');


/* GET home page. */
router.get('/', function(req, res, next) {

  new Album({
    title:'',
    description:'',
    coverImage:'',
    uploadedBy:'',
  })
      .save()
      .then((album)=>{res.status(200).json({album})})
      .catch((err)=>{res.json({err})})
});

module.exports = router;
