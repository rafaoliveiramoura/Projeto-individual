const pesomodels = require("../models/peso.models")

function registrarpeso(req, res) {
    const userId = Number(req.body.userId)
    const peso = Number(req.body.peso)

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido. Faça login novamente")
    }
    if (isNaN(peso) || peso < 20 || peso > 400) {
        return res.status(400).send("Informe um peso válido, entre 20 e 400 kg")
    }

    pesomodels.registrarpeso(Math.round(peso * 100) / 100, userId)
        .then(resultado => res.json({ id: resultado.insertId }))
        .catch(erro => {
            console.error("Erro ao registrar o peso:", erro)
            // 1452 = chave estrangeira (usuário não existe)
            if (erro.errno === 1452) return res.status(400).send("Usuário inexistente")
            // 1146 = tabela que não existe (script não rodou)
            if (erro.errno === 1146) return res.status(500).send("Falta criar a tabela registro_peso. Rode o registro-peso.sql")
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function listarpesos(req, res) {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido")
    }
    pesomodels.listarpesos(userId)
        .then(lista => res.json(lista))
        .catch(erro => {
            console.error("Erro ao listar pesos:", erro)
            if (erro.errno === 1146) return res.status(500).send("Falta criar a tabela registro_peso. Rode o registro-peso.sql")
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

module.exports = { registrarpeso, listarpesos }