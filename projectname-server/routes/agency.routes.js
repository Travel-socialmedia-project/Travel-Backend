const router = require("express").Router();
const Album= require("../models/Album.model")
const mongoose = require("mongoose");

// 
// .Post, create agency
// do we want the users to create it?
// 

// router.post("/agency", (req, res, next) => {
//     const { name, website, description } = req.body;
//     Agency.create({ name, website, description })
//         .then(response => res.status(201).json(response))
//         console.log(response)
//         .catch(e => {
//             console.log("error creating a new agency", e);
//             res.status(500).json({
//                 message: "error creating a new agency",
//                 error: e
//             });
//         })
// });

// 
// .Get, get info from DB
// 

     router.get("/agency", (req, res, next) => {
        Agency.find()
            .then(agencyFromDB => {
                res.json(agencyFromDB);
            })
            .catch(e => {
                console.log("error getting list of agencys", e);
                res.status(500).json({
                    message: "error getting list of agencys",
                    error: e
                });
            })
    });
     module.exports=router;