const database = require("../database/db")

function cadastrar(nome, sobrenome, dtnascimento, email, senha, objetivo) {
    let sql = `INSERT INTO users (nome, sobrenome, dtnascimento, email, senha, objetivo)
               VALUES ('${nome}', '${sobrenome}', '${dtnascimento}', '${email}', '${senha}', '${objetivo}')`
    return database.executar(sql)
}

function autenticar(email, senha) {
    let sql = `SELECT id, nome, email FROM users WHERE email = '${email}' AND senha = '${senha}'`
    return database.executar(sql)
}

module.exports = { autenticar, cadastrar }