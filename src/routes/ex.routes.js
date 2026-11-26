const express = require("express")
const expressrouter = express.Router()

const { listarex, cadastronomeex, cadastrarex, listarregistros, registrosautor } = require("../controllers/ex.controllers")

expressrouter.get("/exercicios", listarex)                      
expressrouter.post("/exercicios", cadastronomeex)               
expressrouter.post("/registros", cadastrarex)                   
expressrouter.get("/users/:id/registros", listarregistros)      
expressrouter.get("/autor/registros", registrosautor)           


module.exports = { expressrouter }