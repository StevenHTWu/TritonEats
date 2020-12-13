const express = require("express");
const mongoose = require("mongoose");
const resMenu = mongoose.model("resMenu");

const router = express.Router();

router.route("/restaurantMenu/:id").get(async function (req, res) {
  id = req.params.id;
  const restaurant_name = id;

  const rnf = await resMenu.findOne({ restaurant_name });
  var curr = new Date();
  var cDate = curr.getDate();
  var cHours = (curr.getHours() - 8) % 24;
  var cMins = curr.getMinutes();
  var cDay = curr.getDay();
  var menu;
  var day;

  if (cDay == 1) day = "Mon";
  else if (cDay == 2) day = "Tues";
  else if (cDay == 3) day = "Wed";
  else if (cDay == 4) day = "Thurs";
  else if (cDay == 5) day = "Fri";
  else if (cDay == 6) day = "Sat";
  else day = "Sun";

  if (!rnf) {
    console.log("422 error ", "no such restaurant available");
    return res.status(422).send({ error: "No such restaurant available" });
  }

  if (
    day == "Mon" ||
    day == "Tues" ||
    day == "Wed" ||
    day == "Thurs" ||
    day == "Fri" ||
    day == "Sat" ||
    day == "Sun"
  ) {
    const getHour = await resMenu.aggregate([
      { $match: { "hours.day": day, restaurant_name: restaurant_name } },
      {
        $project: {
          hours: {
            $filter: {
              input: "$hours",
              as: "hour",
              cond: { $eq: ["$$hour.day", day] },
            },
          },
          _id: 0,
        },
      },
    ]);
    console.log();
    var openBTime = getHour[0].hours[0].opening_hour.split(":");
    var closeBTime = getHour[0].hours[0].closing_hour.split(":");
    var openLTime = getHour[0].hours[1].opening_hour.split(":");
    var closeLTime = getHour[0].hours[1].closing_hour.split(":");
    var openDTime = getHour[0].hours[2].opening_hour.split(":");
    var closeDTime = getHour[0].hours[2].closing_hour.split(":");

    if (
      cHours > openBTime[0] &&
      cHours <= closeBTime[0] &&
      cMins <= closeBTime[1]
    ) {
      console.log("Mon_breakfast");
      menu = "breakfast_menu";
    } else if (
      (cHours >= openLTime[0] && cMins > openLTime[1]) ||
      (cHours <= closeLTime[0] && cMins <= closeLTime[1])
    ) {
      console.log("Mon_lunch");
      menu = "lunch_menu";
    } else if (
      (cHours >= openDTime[0] && cMins > openDTime[1]) ||
      (cHours <= closeDTime[0] && cMins <= closeDTime[1])
    ) {
      console.log("Mon_dinner");
      menu = "dinner_menu";
    } else {
      console.log("422 error", "Restaurant is closed.");
      //return res.status(422).send({ error: "Restaurant is closed." });
    }
  }

  resMenu.find(
    { restaurant_name: restaurant_name },
    menu,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});
module.exports = router;
