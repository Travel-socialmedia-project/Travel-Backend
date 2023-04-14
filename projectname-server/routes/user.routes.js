const router = require("express").Router();
const User= require("../models/User.model")
const mongoose = require("mongoose");


router.get('/user/:userId', (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid( userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findById( userId)
        .then( users => res.json(users))
        .catch(e => {
            console.log("error getting details of the albums", e);
            res.status(500).json({
                message: "error getting details of the albums",
                error: e
            });
        })
});




module.exports=router;