const database = require("../database/db")

// ---------- Dieta (tabela dieta): uma por usuário ----------
function buscardieta(userId) {
    let sql = `SELECT iddieta, tipo FROM dieta WHERE fkuser = ? ORDER BY iddieta LIMIT 1`
    return database.executar(sql, [userId])
}

function cadastradieta(tipo, userId) {
    let sql = `INSERT INTO dieta (tipo, dieta, fkuser) VALUES (?, ?, ?)`
    return database.executar(sql, [tipo, "Minha dieta", userId])
}

// ---------- Alimentos (tabela alimento) ----------
// "peso" guarda a quantidade; "unidade" diz se são g, ml, fatias, copos...
function cadastraalimento(alimento, quantidade, unidade, refeicao, userId, dietaId) {
    let sql = `INSERT INTO alimento (alimento, peso, unidade, refeicao, fkuser, fkdieta) VALUES (?, ?, ?, ?, ?, ?)`
    return database.executar(sql, [alimento, quantidade, unidade, refeicao, userId, dietaId])
}

function listaralimentos(userId) {
    let sql = `SELECT idalimento, alimento, peso, unidade, refeicao
               FROM alimento
               WHERE fkuser = ?
               ORDER BY idalimento`
    return database.executar(sql, [userId])
}

module.exports = { buscardieta, cadastradieta, cadastraalimento, listaralimentos }