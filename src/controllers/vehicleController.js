const express = require("express");
const Vehicle = require("../models/Vehicule");

const router = express.Router();

router.get("/all", async(req,res)=>{
    const all = await Vehicle.find({});
    return res.status(200).send({all});
});

module.exports = (app) => app.use("/vehicle", router);
