const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

router.get("/all", async (req, res) => {
  const all = await Vehicle.find({});
  return res.status(200).send({ all });
});
router.post("/register", async (req, res) => {
  const { licensePlate } = req.body;
  try {
    if (await Vehicle.findOne({ licensePlate })) {
      return res.status(400).send({ error: "vehicle already exists!" });
    }

    const vehicle = await Vehicle.create(req.body);
    return res.status(200).send({ vehicle });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
router.delete("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const deleted = await Vehicle.findOneAndDelete({ _id: _id });

    if (deleted == null) {
      return res.status(400).send({ error: "Vehicle does not exist!" });
    }
    return res.status(200).send({ deleted });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.put("/update/:_id", async (req, res) => {
  const { name, description, licensePlate, manufacturingYear } = req.body;
  try {
    if (!(await Vehicle.findById(req.params._id))) {
      return res.status(400).send({ error: "Vehicle does not exist!" });
    }

    const updated = await Vehicle.findByIdAndUpdate(
      req.params._id,
      {
        name,
        description,
        licensePlate,
        manufacturingYear,
      },
      { new: true }
    );
    return res.status(200).send({ updated });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
router.get("/getById", async (req, res) => {
  const { _id } = req.body;

  if (!(await Vehicle.findOne({ _id: _id }))) {
    return res.status(400).send({ error: "Vehicle does not exists!" });
  }
  const get = await Vehicle.findOne({ _id: _id });

  return res.status(200).send({ get });
});

module.exports = (app) => app.use("/vehicle", router);
