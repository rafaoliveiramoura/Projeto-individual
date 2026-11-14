const express = require("express")
const expressrouter = express.Router()
const { registrarpeso, listarpesos } = require("../controllers/peso.controllers")

expressrouter.post("/pesos", registrarpeso)            // registra uma pesagem
expressrouter.get("/users/:id/pesos", listarpesos)     // histórico de pesagens do usuário

module.exports = { expressrouter }