const express = require("express");
const mongoose = require("mongoose");
const Restaurants = mongoose.model("resHours");
const resMenu = mongoose.model("resMenu");

const router = express.Router();

router.route("/homescreen").get(async function (req, res) {
  console.log("/homescreen");
  const rnf = await resMenu.find({});
  var curr = new Date();
  var cDate = curr.getDate();
  var cHours = curr.getHours();
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
    return res.status(422).send({ error: "No restaurants available" });
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
    const restaurants = await resMenu.find({});
    const res_arr = [];
    var z;

    currTime = cHours * 100 + cMins;
    cDay = cDay - 1;
    for (z = 0; z < restaurants.length; z++) {
      try {
        this_res = restaurants[z].toObject();
        var openBTime = this_res.hours[3 * cDay].opening_hour.split(":");
        var closeDTime = this_res.hours[3 * cDay + 2].closing_hour.split(":");
        var openTimeStr = this_res.hours[3 * cDay].opening_hour;
        var closeTimeStr = this_res.hours[3 * cDay + 2].closing_hour;

        openBTime = parseInt(openBTime[0]) * 100 + parseInt(openBTime[1]);
        closeDTime = parseInt(closeDTime[0]) * 100 + parseInt(closeDTime[1]);
        if (currTime >= openBTime && currTime < closeDTime) {
          var JsonObj = {};
          JsonObj.resName = this_res.restaurant_name;
          JsonObj.openTime = openTimeStr;
          JsonObj.closeTime = closeTimeStr;
          console.log(JsonObj);
          res_arr.push(JsonObj);
        }
      } catch {}
    }
    console.log(res_arr);
    res.status(200).send(res_arr);
  }
});

module.exports = router;
