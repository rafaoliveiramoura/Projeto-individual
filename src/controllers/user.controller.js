
const usarioModel = require("../models/user.model")

function autenticar(req, res){
    const email = req.body.emailServer
    const senha = req.body.senhaServer

    if (!email || !senha ){
        return res.status(400).send("Credenciais inválidas")
    }

    usarioModel.autenticar(email, senha)
        .then (resultadoAutenticar => {
            if (resultadoAutenticar.length === 1){
                const user = resultadoAutenticar[0];
                res.json({
                    id: user.id,
                    email: user.email,
                    nome: user.nome
                })
            } else {
                res.status(401).send("E-mail ou senha incorretos")
            }
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage || "Erro interno no servidor")
        })
}

function cadastrar(req, res) {
    const nome = req.body.nomeServer
    const sobrenome = req.body.sobrenomeServer
    const email = req.body.emailServer
    const senha = req.body.senhaServer
    const dtnascimento = req.body.dtnascServer
    const objetivo = req.body.objServer

    if (!nome || !sobrenome || !email || !senha || !dtnascimento || !objetivo) {
        return res.status(400).send("Credenciais inválidas")
    }

    usarioModel.cadastrar(nome, sobrenome, dtnascimento, email, senha, objetivo)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao cadastrar:", erro);
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}

function cadastraquiz (req, res){
    const { peso, altura, pesoObjetivo, experiencia, foco, frequencia, userId } = req.body;

    if (!userId) {
        return res.status(401).send("Sessão expirada. Por favor, faça login novamente.");
    }

    if (!peso || !altura || !experiencia || !foco || !frequencia) {
        return res.status(400).send("Por favor, preencha todos os campos obrigatórios.");
    }

    const nPeso = parseFloat(peso);
    const nAltura = parseFloat(altura);
    const nPesoObj = parseFloat(pesoObjetivo);

    if (isNaN(nPeso) || isNaN(nAltura) || isNaN(nPesoObj) || nPeso <= 0 || nAltura <= 0 || nPesoObj <= 0) {
        return res.status(400).send("Valores de peso e altura devem ser números positivos.");
    }

    usarioModel.cadastraquiz(nPeso, nAltura, nPesoObj, experiencia, foco, frequencia, userId)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao salvar quiz:", erro);
            res.status(500).json(erro.sqlMessage || "Erro interno ao salvar perfil");
        })
}

function dashboard(req, res){
    let userId = req.params.id

    if (!userId){
        return res.status(400).send("E necessario o id do usuario")
    }
    usarioModel.dashboard(userId)
        .then (function (resultado){
            
            if (resultado.length == 0) {
                return res.status(404).send("Perfil não encontrado")
            }

            let dados = {
            pesoAtual: resultado[0].peso_atual,
            pesoObjetivo: resultado[0].peso_objetivo,
            altura: resultado[0].altura
        }   
        
            res.json(dados)

        }) .catch(function (erro){
             console.log("Erro ao buscar dashboard", erro.sqlMessage || erro)
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })

        
    }



module.exports ={
 autenticar,
 cadastrar,
 cadastraquiz,
 dashboard
}
