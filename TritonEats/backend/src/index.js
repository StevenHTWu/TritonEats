require("./models/Auth");
require("./models/Orderers");
require("./models/History");
require("./models/ResMenu");
require("./models/Orders");
require("./models/Deliverers");
require("./models/resHours");
//require("./models/User"); This line is present in the index.js Wei sent me, but there is no User model so I commented it out

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const orderersRoutes = require("./routes/orderersRoutes");
const deliverersRoutes = require("./routes/delivererRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const historyRoutes = require("./routes/historyRoutes");
const resMenuRoutes = require("./routes/resMenuRoutes");
const resHoursRoutes = require("./routes/resHoursRoutes");
<<<<<<< HEAD

=======
const userInfoRoutes = require("./routes/userInfoRoutes");
>>>>>>> f87db59bfbf970d2dd959e2c268443ecceb44a87
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use("/auth", requireAuth);

app.use(bodyParser.json());
app.use(authRoutes);
app.use(resHoursRoutes);
app.use(orderersRoutes);
app.use(deliverersRoutes);
app.use(resMenuRoutes);
app.use(ordersRoutes);
app.use(historyRoutes);
app.use(userInfoRoutes)


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
  res.send(`Your ID: ${req._id}`);
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
