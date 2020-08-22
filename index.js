const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
//the model has to be imported before passport or errors
//so we define the model before passport tries to access and use it
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) =>
    console.log(`connected to ${db.connections[0].name} collection`)
  );

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//for production
if (process.env.NODE_ENV === "production") {
  //express will serve up production assets
  //like main.js file, or main.css file
  app.use(express.static("client/build"));

  //express will serve up index.html file when
  //it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
