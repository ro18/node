const express = require("express");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require("mongoose");

var PersonalityTextSummaries = require("personality-text-summary");

// locale is one of {'en', 'es', 'ja', 'ko'}.  version refers to which version of Watson Personality Insights to use, v2 or v3.
var v3EnglishTextSummaries = new PersonalityTextSummaries({
  locale: "en",
  version: "v3",
});

//app.use(urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/track_app");

//var port=8000
var userSchema = new mongoose.Schema({
  email: String,
  username: String,
  pass: String,
});

app.get("/home", (req, res) => {
  var myV3EnPersonalityProfile = require("./result2.json");
  // retrieve the summary for a specified personality profile (json)
  var textSummary = v3EnglishTextSummaries.getSummary(myV3EnPersonalityProfile);
  console.log("The summary for the provided profile is " + textSummary);
  res.send(textSummary);
  // res.render("index", { summary: textSummary });
});

app.post("/user", function (req, res, next) {
  var email = req.body.email;
  var username = req.body.username;
  var pass = req.body.password;

  var newUser = new User({
    email: email,
    username: username,
    pass: pass,
  });
  User.create(newUser, function (err, newlyCreated) {
    if (err) {
      console.log("not creating");
    } else {
      console.log("added");
      res.send({ success: true });
    }
  });
});

app.post("/verifyuser", function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  console.log("email", email);
  console.log(pass);

  User.findOne({ email: email, pass: pass }, function (err, user) {
    if (user == null) {
      console.log("not found");
      res.send({ success: false, message: "Invalid Credentials" });
    } else {
      console.log(user);
      res.send({ success: true, user: user.username });
    }
  });
});

app.post("/change", function (req, res) {
  var name = req.body.name;
  var value = req.body.text;

  console.log("name", name);
  console.log(text);

  User.findOneAndUpdate({ username: email, pass: pass }, function (err, user) {
    if (user == null) {
      console.log("not found");
      res.send({ success: false, message: "Invalid Credentials" });
    } else {
      console.log(user);
      res.send({ success: true, user: email });
    }
  });
});

app.get("/", function (req, res, next) {
  res.json([{ id: 1, username: "smbdy", id: 2, username: "noone" }]);
});

//module.exports
const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log("listening");
});
// app1.listen(port,function(req,rs)

var User = mongoose.model("User", userSchema);
