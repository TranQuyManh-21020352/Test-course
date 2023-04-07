const morgan = require("morgan");
const express = require("express");
require("dotenv").config();
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
const port = process.env.port;
const cors = require("cors");
const methodOverride = require("method-override");
const db = require("./config/db/index");
const route = require("./route/index");

db.connect();
//HTTP Logger
app.use(morgan("combined"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: `http://localhost:3000` }));
//app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// Template engine
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum(a, b) {
        return a + b;
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
route(app);
//console.log('Path: ', path.join(__dirname, 'resources/views'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
