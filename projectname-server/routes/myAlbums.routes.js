const router = require("express").Router();
const User= require("../models/User.model")
const mongoose = require("mongoose");
const Album= require("../models/Album.model")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");



router.get("/my-albums", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
    console.log(req.payload._id)
  
    Album.find({ user: userId })
      .populate({ path: "user", select: ["name"] })
      .sort({ createdAt: -1 })
      .then((albumsFromDB) => {
        res.json(albumsFromDB);
      })
      .catch((e) => {
        console.log("error getting list of user's Albums", e);
        res.status(500).json({
          message: "error getting list of user's Albums",
          error: e,
        });
      });
  });


  router.get("/my-albums/:userId", isAuthenticated, (req, res, next) => {
    userId = req.params.user;
    console.log(req.params);
    
  
    Album.find({ user: userId })

     
      .sort({ createdAt: -1 })
      .then((albumsFromDB) => {
        res.json(albumsFromDB);
      })
      .catch((e) => {
        console.log("error getting list of user's Albums", e);
        res.status(500).json({
          message: "error getting list of user's Albums",
          error: e,
        });
      });
  });









module.exports=router;