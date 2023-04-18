const router = require("express").Router();
const User= require("../models/User.model")
const mongoose = require("mongoose");





router.get('/user/:userId/albums', (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid( userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Album.find({ user: userId })
        .then(albums => res.json(albums))
        console.log(albums)
        .catch(e => {
            console.log("error getting albums", e);
            res.status(500).json({
                message: "error getting albums",
                error: e
            });
        })
});










module.exports=router;