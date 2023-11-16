const express = require("express");
const velasRouter = express.Router();
const velasController = require("../controllers/velasController");


velasRouter.get("/", velasController.getCandles);

velasRouter.get("/:id", velasController.getCandleById);

velasRouter.post("/", velasController.createCandle);

velasRouter.put("/:id", velasController.updateCandle);

velasRouter.delete("/:id", velasController.deleteCandle);

module.exports = velasRouter;
