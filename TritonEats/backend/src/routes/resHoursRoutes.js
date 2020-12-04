const express = require("express");
const mongoose = require("mongoose");
const Restaurants = mongoose.model("resHours");

const router = express.Router();

router.get("/homescreen", async (req, res) => {
    
    var today;
    switch (new Date().getDay()) {
        case 0:
          today = "Sun";
          break;
        case 1:
          today = "Mon";
          break;
        case 2:
           today = "Tues";
          break;
        case 3:
          today = "Wed";
          break;
        case 4:
          today = "Thurs";
          break;
        case 5:
          today = "Fri";
          break;
        case 6:
          today = "Sat";
    }

    try {
        const resHoursToday = await Restaurants.aggregate([
            { $match : { "hours.day" : today }}
        ]);
        res.json(resHoursToday);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;