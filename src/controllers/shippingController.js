const express = require("express");
const Shipping = require("../models/Shipping");
const Cargo = require("../models/Cargo");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const all = await Shipping.find({})
      .populate("driver")
      .populate("vehicle")
      .populate("cargo");
    return res.status(200).send({ all });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { driver, vehicle, description, cargo } = req.body;

    const created = await Shipping.create({ driver, vehicle, description });

    await Promise.all(
      cargo.map(async (c) => {
        const shipCargo = new Cargo({ ...c, shipping: created._id });

        await shipCargo.save();

        created.cargo.push(shipCargo);
      })
    );

    await created.save();
    return res.status(200).send({ created });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const deleted = await Shipping.findByIdAndDelete(req.params._id);
    if (deleted == null) {
      return res.status(400).send({ error: "Shipping does not exist!" });
    }
    return res.status(200).send({ deleted });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.put("/update/:_id", async (req, res) => {
  try {
    const { driver, vehicle, description, cargo } = req.body;

    const updated = await Shipping.findByIdAndUpdate(
      req.params._id,
      {
        driver,
        vehicle,
        description,
      },
      { new: true }
    );
    updated.cargo = [];
    await Cargo.remove({ shipping: updated._id });

    await Promise.all(
      cargo.map(async (c) => {
        const shipCargo = new Cargo({ ...c, shipping: updated._id });

        await shipCargo.save();

        updated.cargo.push(shipCargo);
      })
    );

    await updated.save();
    return res.status(200).send({ updated });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get("/get/:_id", async (req, res) => {
  try {
    if (!(await Shipping.findById(req.params._id))) {
      return res.status(400).send({ error: "Shipping does not exist!" });
    }
    const get = await Shipping.findById(req.params._id);

    return res.status(200).send({ get });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = (app) => app.use("/shipping", router);
