const router = require("express").Router();
const Album = require("../models/Album.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//
// .Post, create the album
//
router.post("/albums", isAuthenticated , (req, res, next) => {
   const userId = req.payload._id;
 
  const { image, title, country, description,  city,  } = req.body;
  Album.create({ image, title, country, description,  city, user:userId  })
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
router.get("/albums", (req, res, next) => {
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
//

router.put("/albums/:albumId", (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findByIdAndUpdate(albumId, req.body, { new: true })
    .then((updatedAlbum) => res.json(updatedAlbum))
    .catch((e) => {
      console.log("error updating album", e);
      res.status(500).json({
        message: "error updating album",
        error: e,
      });
    });
});

//
//
//

router.delete("/albums/:albumId", (req, res, next) => {
  const { albumId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(albumId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Album.findByIdAndRemove(albumId)
    .then(() =>
      res.json({
        message: `Album with ${albumId} is removed successfully.`,
      })
    )
    .catch((e) => {
      console.log("error deleting albums", e);
      res.status(500).json({
        message: "error deleting albums",
        error: e,
      });
    });
});

module.exports = router;
