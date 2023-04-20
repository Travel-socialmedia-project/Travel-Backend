const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const Agency = require("../models/Agency.model.js")

// 
// .Post, create agency
// do we want the users to create it?
// 

router.post("/agency",isAuthenticated, (req, res, next) => {
    const { name, website, phonenumber, logo, email } = req.body;
    
    Agency.create({ name, website, phonenumber, logo:logo.logoUrl , email })
      .then((response) => {
        console.log(response);
        res.status(201).json(response);
      })

      .catch((e) => {
        console.log("error creating a new agency", e);
        res.status(500).json({
          message: "error creating a new agency",
          error: e,
        });
      });
  });
  
  router.get("/agency", (req, res, next) => {
    Agency.find()
      .populate("collections")
      .then((agencyFromDB) => {
        res.json(agencyFromDB);
      })
      .catch((e) => {
        console.log("error getting list of agencys", e);
        res.status(500).json({
          message: "error getting list of agencys",
          error: e,
        });
      });
  });
  




     module.exports=router;