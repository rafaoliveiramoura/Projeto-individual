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

function cadastraquiz(peso, altura, pesoobjetivo, tempotreino, foco, frequencia, userId) {
    let sql = `INSERT INTO infopeso (peso_atual, altura, peso_objetivo, tempotreino, frequencia, muscolofoco, fkuser)
               VALUES (?, ?, ?, ?, ?, ?, ?)`
    return database.executar(sql, [peso, altura, pesoobjetivo, tempotreino, frequencia, foco, userId])
}

function dashboard(userId) {
    let sql = `SELECT peso_atual, peso_objetivo, frequencia FROM infopeso WHERE fkuser = ? LIMIT 1`
    return database.executar(sql, [userId])
}

module.exports = { autenticar, cadastrar, cadastraquiz, dashboard }
