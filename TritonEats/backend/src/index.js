require("./models/User");
require("./models/resHours");
require("./models/Orderer");
require("./models/Orders");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const resHoursRoutes = require("./routes/resHoursRoutes");
const ordererRoutes = require("./routes/ordererRoutes");
const deliverStatusRoutes = require("./routes/deliveryStatusRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(resHoursRoutes);
app.use(ordererRoutes);
app.use(deliverStatusRoutes);

const mongoUri =
  "mongodb+srv://tritoneats:cse110fa20@cluster0.bkbuy.mongodb.net/TritonEats?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
