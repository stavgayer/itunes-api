const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./models/SearchTerm");


//Check env
const isProduction = process.env.NODE_ENV === "production";
mongoose.connect(keys.mongoURI);
const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(require("./routes"));


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//Basic configurations
//Catching 404 error
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  if (!isProduction) {
    console.log(err);
  }
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: isProduction ? err : {}
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ` + PORT);
});
