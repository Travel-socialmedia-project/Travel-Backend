const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary.config');

router.post('/upload', upload.single('image'),  (req, res) => {
  if(!req.path){
    return res.status(404).json({msg:"no image was found"})
  }
  return res.status(200).json({imageUrl: req.file.path})
});

module.exports = router;