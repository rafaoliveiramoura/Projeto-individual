const express = require("express")
const expressrouter = express.Router()
const { cadastrarali, listaralimentos } = require("../controllers/dieta.controllers")

expressrouter.post("/alimentos", cadastrarali)                  
expressrouter.get("/users/:id/alimentos", listaralimentos)      

module.exports = { expressrouter }