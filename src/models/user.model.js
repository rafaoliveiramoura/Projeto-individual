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

function cadastraquiz (peso, altura, pesoobjetivo, tempotreino, foco, frequencia, userId){
    // Usamos INSERT ... ON DUPLICATE KEY UPDATE para garantir um perfil por usuário
    let sql = `INSERT INTO infopeso (peso_atual, altura, peso_objetivo, tempotreino, frequencia, muscolofoco, fkuser)
               VALUES ("${peso}", '${altura}', '${pesoobjetivo}', '${tempotreino}', '${foco}','${frequencia}', '${userId}')`
               return database.executar(sql)
}

module.exports = { autenticar, cadastrar, cadastraquiz }
