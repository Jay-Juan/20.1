const velasModel = require("../models/velasModel");

const getCandles = async (req, res) => {
  const users = await velasModel.getCandles();
  res.json(users);
};

const getCandleById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await velasModel.getCandleById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Vela no encontrada" });
  }
};

const createCandle = async (req, res) => {
  const createdUser = await velasModel.createCandle(req.body);
  if (createdUser) {
    res.json(createdUser);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateCandle = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await velasModel.getCandleById(id);
  if (user) {
    const updatedUser = await velasModel.updateCandle(parseInt(req.params.id), {
      ...user,
      ...req.body,
    });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Vela no encontrada" });
  }
};

const deleteCandle = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await velasModel.getCandleById(id);
  if (user) {
    const result = await velasModel.deleteCandle(parseInt(req.params.id));

    if (result) {
      res.json(user);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Vela no encontrada" });
  }
};

module.exports = {
  getCandles,
  getCandleById,
  createCandle,
  updateCandle,
  deleteCandle,
};
