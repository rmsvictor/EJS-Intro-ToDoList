const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

const items = ['Buy food', 'Cook Food', 'Eat food'];
const workItems = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");


app.get("/", function(req, res) {
const day = date.getDate();
    res.render("list", {listTitle: day,newListItems: items});
});


app.post("/", function(req, res) {
  const item = req.body.newItem;
  console.log(req.body);

if(req.body.list === "Work"){
  workItems.push(item);
  res.redirect("/work");
} else {
  items.push(item)
  res.redirect("/");
}
});


app.get("/work", function (req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function (req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000")
})
