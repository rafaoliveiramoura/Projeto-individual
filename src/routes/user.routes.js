const express = require("express")
const expressrouter = express.Router()
const {cadastrar, autenticar} = require("../controllers/user.controller")
let users = []

expressrouter.post("/users/cadastrar", cadastrar)
expressrouter.post("/users/autenticar", autenticar)

function adduser (user){
    user.push(user)
}

expressrouter.get("/users", (res,resp) =>{
    res.json(users)
})

module.exports = {
    adduser,
    expressrouter,
    users
}