const express = require("express")
const expressrouter = express.Router()
const { registrarpeso, listarpesos } = require("../controllers/peso.controllers")

expressrouter.post("/pesos", registrarpeso)            
expressrouter.get("/users/:id/pesos", listarpesos)     

module.exports = { expressrouter }