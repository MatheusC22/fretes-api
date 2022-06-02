const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
require("./controllers/index")(app);

app.listen(process.env.PORT || 3333);
console.log("API listening at port " + process.env.PORT);
