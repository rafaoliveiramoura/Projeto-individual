
let usarioModel = require("../models/user.model")

function autenticar(req, res){
    let email = req.body.emailServe
    let senha = req.body.senhaServe

    if (!email || !senha ){
        res.status(400).send("Credecias invalidas")
    } else {
        usarioModel.autenticar(email, senha)
        .then (
            function (resultadoAutenticar){
                if (resultadoAutenticar.length == 1){
                    res.json({
                            id: resultadoAutenticar[0].id,
                            email:resultadoAutenticar[0].email,
                            nome:resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha


                    })
            }}
        ).catch(
            function (erro){
                res.status(500).json(erro.sqlMessage)
            }
        )
    }
}

function cadastrar(req, res) {
    let nome = req.body.nomeServer
    let sobrenome = req.body.sobrenomeServer
    let email = req.body.emailServer
    let senha = req.body.senhaServer
    let dtnascimento = req.body.dtnascServer
    let objetivo = req.body.objServer

    if (!nome || !sobrenome || !email || !senha || !dtnascimento || !objetivo) {
        return res.status(400).send("Credenciais inválidas")
    }

    usarioModel.cadastrar(nome, sobrenome, dtnascimento, email, senha, objetivo)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Houve erro ao realizar o cadastro", erro.sqlMessage || erro)
            res.status(500).json(erro.sqlMessage || "Erro interno")
        })
}
    function listarusers(req,res){
        res.json(resultado)
}

module.exports ={
 autenticar,
 cadastrar,
 listarusers
}