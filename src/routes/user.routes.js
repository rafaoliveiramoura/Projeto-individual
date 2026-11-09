const express = require("express")
const expressrouter = express.Router()
const {cadastrar, autenticar, cadastraquiz} = require("../controllers/user.controller")
let users = []

expressrouter.post("/users/cadastrar", cadastrar)
expressrouter.post("/users/autenticar", autenticar)
expressrouter.post("/quiz", cadastraquiz)

function adduser (user){
    users.push(user)
}

expressrouter.get("/users", (req, resp) =>{
    resp.json(users)
})

module.exports = {
    adduser,
    expressrouter,
    users
}