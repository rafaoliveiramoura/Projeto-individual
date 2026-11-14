const database = require("../database/db")

function registrarpeso(peso, userId) {
    let sql = `INSERT INTO registro_peso (peso, fkuser) VALUES (?, ?)`
    return database.executar(sql, [peso, userId])
}

// Mais antigas primeiro, para o gráfico seguir a ordem do tempo
function listarpesos(userId) {
    let sql = `SELECT idregistro, peso, dt_registro
               FROM registro_peso
               WHERE fkuser = ?
               ORDER BY dt_registro, idregistro
               LIMIT 200`
    return database.executar(sql, [userId])
}

module.exports = { registrarpeso, listarpesos }