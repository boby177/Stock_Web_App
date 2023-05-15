const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const request = require("request");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Request API Key from IEX Cloud Service
function getRequestAPI(response, market) {
  request(
    `https://cloud.iexapis.com/stable/stock/` +
      market +
      `/quote?token=sk_b621ff26724547b3975b39d2cbc9aff8`,
    { json: true },
    (err, res, body) => {
      // Checking the response API
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        // console.log(body);
        response(body);
      }
    }
  );
}

// Set Handlebars Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Set body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set handlebars index GET routes
app.get("/", (req, res) => {
  getRequestAPI(function (responseAPI) {
    res.render("home", {
      stuff: responseAPI,
    });
  }, "fb");
});

// Set handlebars index POST routes
app.post("/", (req, res) => {
  // stockMarket = req.body.stock_market;
  getRequestAPI(function (responseAPI) {
    res.render("home", {
      stuff: responseAPI,
      //   stock_market: stockMarket,
    });
  }, req.body.stock_market);
});

app.get("/about.html", (req, res) => {
  res.render("about");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on port " + PORT));
