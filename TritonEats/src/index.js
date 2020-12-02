require("./Models/Auth");
require("./Models/Orderers");
require("./Models/History");
require("./models/ResMenu");
//require("./models/User"); This line is present in the index.js Wei sent me, but there is no User model so I commented it out

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const orderersRoutes = require("./routes/orderersRoutes");
const resMenuRoutes = require("./routes/resMenuRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(orderersRoutes);
app.use(resMenuRoutes);

const mongoUri =
  "mongodb+srv://tritoneats:cse110fa20@cluster0.bkbuy.mongodb.net/TritonEats?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
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
  console.log("Listening to port 3000");
});
