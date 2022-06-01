const express = require("express");
const Cargo = require("../models/Cargo");
const Shipping = require("../models/Shipping");

const router = express.Router();
/*return all cargo */
router.get("/all", async (req, res) => {
  const all = await Cargo.find({}).populate("shipping");
  return res.status(200).send({ all });
});
/*registers cargo */
router.post("/register", async (req, res) => {
  try {
    const { shipping } = req.body;
    if (!(await Shipping.findById(shipping))) {
      return res.status(400).send({ error: "shipping does not exist!" });
    }
    const newCargo = await Cargo.create(req.body);
    const shipAtt = await Shipping.findById(shipping);
    shipAtt.cargo.push(newCargo);
    await shipAtt.save();
    return res.status(200).send({ newCargo });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
/** deletes cargo By id ->PASSAR ID POR PARAMS<- */
router.delete("/delete/:_id", async (req, res) => {
  try {
    const deleted = await Cargo.findByIdAndDelete(req.params._id);
    if (deleted == null) {
      return res.status(400).send({ error: "cargo does not exist!" });
    }
    return res.status(200).send({ deleted });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
/** update cargo by Id ->PASSAR ID POR PARAMS<- */
router.put("/update/:_id", async (req, res) => {
  const { name, description, shipping, recipientCep } = req.body;
  try {
    if (!(await Cargo.findById(req.params._id))) {
      return res.status(400).send({ error: "Cargo does not exist!" });
    }

    const updated = await Cargo.findByIdAndUpdate(
      req.params._id,
      {
        name,
        description,
        shipping,
        recipientCep,
      },
      { new: true }
    );
    return res.status(200).send({ updated });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
/** get Cargo By Id ->PASSAR ID POR PARAMS<- */
router.get("/get/:_id", async (req, res) => {
  try {
    if (!(await Cargo.findById(req.params._id))) {
      return res.status(400).send({ error: "Cargo does not exist!" });
    }
    const get = await Cargo.findById(req.params._id);

    return res.status(200).send({ get });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = (app) => app.use("/cargo", router);