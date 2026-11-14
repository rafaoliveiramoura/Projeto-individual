const database = require("../database/db")

function cadastrar(nome, sobrenome, dtnascimento, email, senha, objetivo) {
    let sql = `INSERT INTO users (nome, sobrenome, dtnascimento, email, senha, objetivo)
               VALUES (?, ?, ?, ?, ?, ?)`
    return database.executar(sql, [nome, sobrenome, dtnascimento, email, senha, objetivo])
}

function autenticar(email, senha) {
    let sql = `SELECT id, nome, email FROM users WHERE email = ? AND senha = ?`
    return database.executar(sql, [email, senha])
}

function cadastraquiz(peso, altura, pesoobjetivo, tempotreino, foco, frequencia, imc, userId) {
    let sql = `INSERT INTO infopeso (peso_atual, altura, peso_objetivo, tempotreino, frequencia, muscolofoco, imc, fkuser)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    return database.executar(sql, [peso, altura, pesoobjetivo, tempotreino, frequencia, foco, imc, userId])
}

function dashboard(userId) {
    // altura é necessária para o IMC do dashboard
    let sql = `SELECT peso_atual, peso_objetivo, altura, frequencia FROM infopeso WHERE fkuser = ? LIMIT 1`
    return database.executar(sql, [userId])
}

module.exports = { autenticar, cadastrar, cadastraquiz, dashboard }