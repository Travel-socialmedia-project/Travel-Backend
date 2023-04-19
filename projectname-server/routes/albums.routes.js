const router = require("express").Router();
const Album = require("../models/Album.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");



router.post("/albums", isAuthenticated, (req, res, next) => {
  
   const userId = req.payload._id;
  const { title, country, description,  city, useracess, image  } = req.body;

  
  Album.create({  title, country, description, image: image.imageUrl,  city, useracess:[], user:userId  })
    .then((response) => res.status(201).json(response))
    
    .catch((e) => {
      console.log("error creating a new album", e);
      res.status(500).json({
        message: "error creating a new album",
        error: e,
      });
    });
});


//
// .Get, get info from DB
//
router.get("/albums" , (req, res, next) => {
  Album.find()
   .populate({path:'user', select:["name"]})
    .sort({ createdAt: -1 })
   .then((albumsFromDB) => {
      res.json(albumsFromDB);
    })
    .catch((e) => {
      console.log("error getting list of Albums", e);
      res.status(500).json({
        message: "error getting list of Albums",
        error: e,
      });
    });
});

//
// .Get, get details from a specific album
//

router.get("/albums/:albumId", (req, res, next) => {
  const { albumId } = req.params;
 

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findById(albumId)
  .populate({path:'user', select:["name"]})
    .then((albums) => res.json(albums))
    .catch((e) => {
      console.log("error getting details of the albums", e);
      res.status(500).json({
        message: "error getting details of the albums",
        error: e,
      });
    });
});


//

// .Put, update new album details
router.put("/albums/:albumId", isAuthenticated, (req, res, next) => {
  const { albumId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findById(albumId)
    .then((album) => {
      if (!album) {
        res.status(404).json({ message: "Album not found" });
        return;
      }

      if (album.user.toString() !== userId) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      Album.findByIdAndUpdate(albumId, req.body, { new: true })
        .then((updatedAlbum) => res.json(updatedAlbum))
        .catch((e) => {
          console.log("error updating album", e);
          res.status(500).json({
            message: "error updating album",
            error: e,npm
          });
        });
    })
    .catch((e) => {
      console.log("error finding album", e);
      res.status(500).json({
        message: "error finding album",
        error: e,
      });
    });
});

//
// .Delete, delete an album
//

router.delete("/albums/:albumId", isAuthenticated, (req, res, next) => {
  const { albumId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findById(albumId)
    .then((album) => {
      if (!album) {
        res.status(404).json({ message: "Album not found" });
        return;
      }

      if (album.user.toString() !== userId) {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      Album.findByIdAndRemove(albumId)
        .then(() =>
          res.json({
            message: `Album with ${albumId} is removed successfully.`,
          })
        )
        .catch((e) => {
          console.log("error deleting album", e);
          res.status(500).json({
            message: "error deleting album",
            error: e,
          });
        });
    })
    .catch((e) => {
      console.log("error finding album", e);
      res.status(500).json({
        message: "error finding album",
        error: e,
      });
    });
});









module.exports = router;
