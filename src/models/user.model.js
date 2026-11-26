const database = require("../database/db")

function cadastrar(nome, sobrenome, dtnascimento, email, senha, objetivo) {
    let sql = `INSERT INTO users (nome, sobrenome, dtnascimento, email, senha, objetivo)
               VALUES (?, ?, ?, ?, ?, ?)`
    return database.executar(sql, [nome, sobrenome, dtnascimento, email, senha, objetivo])
}

function autenticar(email, senha) {

    let sql = `SELECT id, nome, email, quizfeito FROM users WHERE email = ? AND senha = ?`
    return database.executar(sql, [email, senha])
}

function cadastraquiz(peso, altura, pesoobjetivo, tempotreino, foco, frequencia, imc, userId) {
    let sqlQuiz = `INSERT INTO infopeso (peso_atual, altura, peso_objetivo, tempotreino, frequencia, muscolofoco, imc, fkuser)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    return database.executar(sqlQuiz, [peso, altura, pesoobjetivo, tempotreino, frequencia, foco, imc, userId])
        .then(resultadoInsert => {
            
            let sqlFeito = `UPDATE users SET quizfeito = 1 WHERE id = ?`
            return database.executar(sqlFeito, [userId]).then(() => resultadoInsert)
        })
}

function dashboard(userId) {
    
    let sql = `SELECT peso_atual, peso_objetivo, altura, frequencia FROM infopeso WHERE fkuser = ? LIMIT 1`
    return database.executar(sql, [userId])
}

module.exports = { autenticar, cadastrar, cadastraquiz, dashboard }