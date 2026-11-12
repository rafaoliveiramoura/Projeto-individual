const express = require("express")
const expressrouter = express.Router()

const { listarex, cadastronomeex, cadastrarex, listarregistros, registrosautor } = require("../controllers/ex.controllers")

expressrouter.get("/exercicios", listarex)                      // catálogo (nomes)
expressrouter.post("/exercicios", cadastronomeex)               // cria um exercício novo
expressrouter.post("/registros", cadastrarex)                   // registra carga/séries/repetições
expressrouter.get("/users/:id/registros", listarregistros)      // treino do usuário
expressrouter.get("/autor/registros", registrosautor)           // treino do autor (referência)


module.exports = { expressrouter }