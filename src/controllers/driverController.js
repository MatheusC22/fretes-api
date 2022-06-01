const express = require("express");
const Driver = require("../models/Driver");

const router = express.Router();

/*Registers driver*/
router.get("/all", async (req, res) => {
  const all = await Driver.find({});
  return res.send({ all });
});
/*Registers driver*/
router.post("/register", async (req, res) => {
  const { cpf } = req.body;

  try {
    if (await Driver.findOne({ cpf }))
      return res.status(400).send({ error: "driver already exists!" });

    const driver = await Driver.create(req.body);
    return res.status(200).send({ driver });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
/*Updates driver By _id ->PASSAR ID POR PARAMS<-*/
router.put("/update/:_id", async (req, res) => {
  const { name, cpf, birthdate } = req.body;
  try {
    if (!(await Driver.findById(req.params._id))) {
      return res.status(400).send({ error: "driver does not exists!" });
    }

    const updated = await Driver.findByIdAndUpdate(
      req.params._id,
      {
        name,
        cpf,
        birthdate,
      },
      { new: true }
    );
    return res.status(200).send({ updated });
  } catch (err) {
    return res.status(400).send({ errimho: err.message });
  }
});
/*Deletes driver By _id*/
router.delete("/delete", async (req, res) => {
  const { _id } = req.body;

  try {
    const deleted = await Driver.findOneAndDelete({ _id: _id });

    if (deleted == null) {
      return res.status(400).send({ error: "driver does not exist!" });
    }
    return res.status(200).send({ deleted });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});
/*Find One by _id*/
router.get("/getById", async (req, res) => {
  const { _id } = req.body;

  if (!(await Driver.findOne({ _id }))) {
    return res.status(400).send({ error: "driver does not exists!" });
  }
  const get = Driver.findOne({ _id });

  return res.status(200).send({ get });
});

module.exports = (app) => app.use("/driver", router);
