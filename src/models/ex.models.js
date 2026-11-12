const database = require("../database/db")

// ---------- Catálogo de exercícios (tabela exercicio) ----------
function listarex() {
    let sql = `SELECT idexercicio, nome FROM exercicio ORDER BY nome`
    return database.executar(sql, [])
}

function buscarnomeex(nome) {
    let sql = `SELECT idexercicio, nome FROM exercicio WHERE LOWER(nome) = LOWER(?)`
    return database.executar(sql, [nome])
}

function cadastranomeex(nome) {
    let sql = `INSERT INTO exercicio (nome) VALUES (?)`
    return database.executar(sql, [nome])
}


function cadastraex(carga, series, repeticoes, userId, exercicioId) {
    let sql = `INSERT INTO registro (carga, series, repeticoes, fkuser, fkexercicio) VALUES (?, ?, ?, ?, ?)`
    return database.executar(sql, [carga, series, repeticoes, userId, exercicioId])
}

function listarregistros(userId) {
    let sql = `SELECT r.idregistro, e.nome, r.carga, r.series, r.repeticoes, r.data_registro
               FROM registro r
               JOIN exercicio e ON e.idexercicio = r.fkexercicio
               WHERE r.fkuser = ?
               ORDER BY r.data_registro DESC, r.idregistro DESC`
    return database.executar(sql, [userId])
}

module.exports = { listarex, buscarnomeex, cadastranomeex, cadastraex, listarregistros }