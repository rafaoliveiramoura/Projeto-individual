const express = require("express")
const expressrouter = express.Router()
const { cadastrarali, listaralimentos } = require("../controllers/dieta.controllers")

expressrouter.post("/alimentos", cadastrarali)                  // cadastra um alimento na dieta do usuário
expressrouter.get("/users/:id/alimentos", listaralimentos)      // dieta do usuário

module.exports = { expressrouter }