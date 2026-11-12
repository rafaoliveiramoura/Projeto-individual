const dietamodels = require("../models/dieta.models")

const REFEICOES = ["Manhã", "Almoço", "Lanche", "Pré-treino", "Pós-treino", "Janta", "Ceia"]
const UNIDADES = ["g", "ml", "unidade", "fatia", "copo", "colher", "xícara", "porção"]
// Precisam ser iguais aos valores do CHECK da tabela dieta (veja dieta-migracao.sql)
const TIPOS = ["Emagrecimento", "Hipertrofia", "Manutenção"]

function cadastrarali(req, res) {
    const userId = Number(req.body.userId)
    const alimento = String(req.body.alimento || "").trim()
    const quantidade = Number(req.body.quantidade)
    const unidade = String(req.body.unidade || "")
    const refeicao = String(req.body.refeicao || "")
    const tipo = req.body.tipo ? String(req.body.tipo) : null

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido. Faça login novamente")
    }
    if (!REFEICOES.includes(refeicao)) {
        return res.status(400).send("Escolha a refeição")
    }
    if (!alimento) {
        return res.status(400).send("Informe o nome do alimento")
    }
    if (alimento.length > 45) {
        return res.status(400).send("O nome do alimento pode ter no máximo 45 caracteres")
    }
    if (isNaN(quantidade) || quantidade <= 0 || quantidade > 9999) {
        return res.status(400).send("Informe uma quantidade válida (maior que 0)")
    }
    if (!UNIDADES.includes(unidade)) {
        return res.status(400).send("Escolha a unidade")
    }
    if (tipo !== null && !TIPOS.includes(tipo)) {
        return res.status(400).send("Objetivo da dieta inválido")
    }

    // Usa a dieta do usuário; se ainda não existir, cria na primeira vez
    dietamodels.buscardieta(userId)
        .then(existente => {
            if (existente.length > 0) return existente[0].iddieta
            return dietamodels.cadastradieta(tipo, userId).then(r => r.insertId)
        })
        .then(dietaId => dietamodels.cadastraalimento(alimento, quantidade, unidade, refeicao, userId, dietaId))
        .then(resultado => res.json({ id: resultado.insertId }))
        .catch(erro => {
            console.error("Erro ao cadastrar o alimento:", erro)
            // 1452 = chave estrangeira (usuário não existe)
            if (erro.errno === 1452) return res.status(400).send("Usuário inexistente")
            // 3819 = CHECK da coluna tipo (valores antigos do banco)
            if (erro.errno === 3819) return res.status(400).send("Objetivo não aceito pelo banco. Rode o dieta-migracao.sql")
            // 1054 = coluna que não existe (migração não rodou)
            if (erro.errno === 1054) return res.status(500).send("Faltam as colunas novas no banco. Rode o dieta-migracao.sql")
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function enviaralimentos(userId, res) {
    dietamodels.listaralimentos(userId)
        .then(lista => res.json(lista))
        .catch(erro => {
            console.error("Erro ao listar alimentos:", erro)
            if (erro.errno === 1054) return res.status(500).send("Faltam as colunas novas no banco. Rode o dieta-migracao.sql")
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function listaralimentos(req, res) {
    const userId = Number(req.params.id)
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send("Usuário inválido")
    }
    enviaralimentos(userId, res)
}

module.exports = { cadastrarali, listaralimentos }