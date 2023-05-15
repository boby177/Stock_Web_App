const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const otherStuff = "This is other stuff!";

// Set handlebars routes
app.get("/", (req, res) => {
  res.render("home", {
    stuff: otherStuff,
  });
});

app.get("/about.html", (req, res) => {
  res.render("about");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on port " + PORT));
