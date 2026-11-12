const exmodels = require("../models/ex.models")

// id do AUTOR na tabela users (o treino dele aparece para todos como referência).
// Troque pelo seu id: SELECT id FROM users WHERE email = 'seu-email';
const ID_AUTOR = 1

function listarex(req, res) {
    exmodels.listarex()
        .then(lista => res.json(lista))
        .catch(erro => {
            console.error("Erro ao listar exercícios:", erro)
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

// Cadastra o NOME de um exercício novo (ou devolve o que já existe)
function cadastronomeex(req, res) {
    const nome = String(req.body.nome || "").trim()

    if (!nome) {
        return res.status(400).send("Informe o nome do exercício")
    }
    if (nome.length > 100) {
        return res.status(400).send("O nome pode ter no máximo 100 caracteres")
    }

    exmodels.buscarnomeex(nome)
        .then(existente => {
            if (existente.length > 0) {
                return res.json({ id: existente[0].idexercicio, jaExistia: true })
            }
            return exmodels.cadastranomeex(nome)
                .then(resultado => res.json({ id: resultado.insertId, jaExistia: false }))
        })
        .catch(erro => {
            console.error("Erro ao cadastrar o nome do exercício:", erro)
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

// Cadastra um REGISTRO do treino: carga, séries e repetições de um exercício
function cadastrarex(req, res) {
    const userId = Number(req.body.userId)
    const exercicioId = Number(req.body.fkexercicio)
    const carga = Number(req.body.carga)
    const series = Number(req.body.series)
    const repeticoes = Number(req.body.repeticoes)

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido. Faça login novamente")
    }
    if (!Number.isInteger(exercicioId) || exercicioId <= 0) {
        return res.status(400).send("Escolha um exercício")
    }
    if (isNaN(carga) || carga < 0 || carga > 999) {
        return res.status(400).send("Informe uma carga válida (0 a 999 kg)")
    }
    if (!Number.isInteger(series) || series < 1 || series > 20) {
        return res.status(400).send("Informe de 1 a 20 séries")
    }
    if (!Number.isInteger(repeticoes) || repeticoes < 1 || repeticoes > 100) {
        return res.status(400).send("Informe de 1 a 100 repetições")
    }

    exmodels.cadastraex(carga, series, repeticoes, userId, exercicioId)
        .then(resultado => res.json({ id: resultado.insertId }))
        .catch(erro => {
            console.error("Erro ao cadastrar o registro:", erro)
            // 1452 = chave estrangeira: usuário ou exercício não existe
            if (erro.errno === 1452) {
                return res.status(400).send("Usuário ou exercício inexistente")
            }
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function enviarregistros(userId, res) {
    exmodels.listarregistros(userId)
        .then(lista => res.json(lista))
        .catch(erro => {
            console.error("Erro ao listar registros:", erro)
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function listarregistros(req, res) {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido")
    }
    enviarregistros(userId, res)
}

function registrosautor(req, res) {
    enviarregistros(ID_AUTOR, res)
}

module.exports = { listarex, cadastronomeex, cadastrarex, listarregistros, registrosautor }