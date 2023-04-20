const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary.config');

router.post('/upload', upload.single('image'), (req, res) => {
  if(!req.file){
    return res.status(404).json({msg:"no image was found"})
  }
  return res.status(200).json({imageUrl: req.file.path})
});

router.post('/upload/logo', upload.single('logo'), (req, res) => {
  if(!req.file){
    return res.status(404).json({msg:"no logo was found"})
  }
  return res.status(200).json({logoUrl: req.file.path})
});

module.exports = router;