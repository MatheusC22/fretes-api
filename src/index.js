const express = require("express");
const bodyParser = require("body-parser");
const helmet =require("helmet");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
require("./controllers/index")(app);

app.listen(process.env.PORT || 3333);
console.log("API listening at port " + process.env.PORT);
