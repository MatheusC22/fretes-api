const express = require("express");
const Cargo = require("../models/Cargo");
const Shipping = require("../models/Shipping");
const axios = require("axios");

const router = express.Router();
/*return all cargo */
router.get("/all", async (req, res) => {
  const all = await Cargo.find({}).populate("shipping");
  return res.status(200).send({ all });
});
/*registers cargo */
router.post("/register", async (req, res) => {
  try {
    const { shipping, recipientCep } = req.body;
    if (!(await Shipping.findById(shipping))) {
      return res.status(400).send({ error: "shipping does not exist!" });
    }
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${recipientCep}/json/`
    );
    //verifica se a requisição nao retornou erro por cpf malformatado
    if (data.erro == "true") {
      return res.status(400).send({ error: "invalid zip code" });
      //realiza uma requisição a uma api de CEPs e verifica se o uf retornado é = SP
    } else if (data.uf != "SP" || data.erro == true) {
      return res
        .status(400)
        .send({ error: "only valid zip codes from são Paulo" });
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
    const id = req.params._id;
    //EXCLUI O REGISTRO DE CARGA
    const deleted = await Cargo.findByIdAndDelete(req.params._id);
    if (deleted == null) {
      return res.status(400).send({ error: "cargo does not exist!" });
    }
    //RETIRA A CARGA DO ATUAL FRETE
    await Shipping.findOneAndUpdate(
      { cargo: id },
      { $pull: { cargo: id } },
      { new: true }
    );
    return res.status(200).send({ deleted });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

// RETIRA A CARGO DO ATUAL FRETE
router.get("/unload/:_id", async (req, res) => {
  const id = req.params._id;

  const exist = await Shipping.findOneAndUpdate(
    { cargo: id },
    { $pull: { cargo: id } },
    { new: true }
  );

  return res.send({ exist });
});
/** update cargo by Id ->PASSAR ID POR PARAMS<- */
router.put("/update/:_id", async (req, res) => {
  const { name, description, shipping, recipientCep } = req.body;
  try {
    const id = req.params._id;
    // RETIRA A CARGA DE SEU ANTIGO FRETE
    if (shipping != null) {
      await Shipping.findOneAndUpdate(
        { cargo: id },
        { $pull: { cargo: id } },
        { new: true }
      );
    }

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
    const shipAtt = await Shipping.findById(shipping);
    shipAtt.cargo.push(updated);
    await shipAtt.save();
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
