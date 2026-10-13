
let usarioModel = require("../models/user.model")
const {addUser} = require("../routes/user.routes")

function autenticar(res,resp){
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

function cadastrar (req, res){
    let nome = req.body.nomeServer
    let sobrenome = req.body.sobrenomeServer
    let email = req.body.emailServe
    let senha = req.body.senhaVar
    let dtnascimento = req.body.dtnascServer
    let objetivo = req.body.objetivoServer

        if(nome == undefined || email == undefined || senha == undefined || objetivo == undefined || sobrenome == undefined){
            res.status(400).send("Credencias invalidas")
        }else {
            usarioModel.cadastrar(nome, sobrenome, dtnascimento,  email, senha, objetivo)
            .then(
                function resultado(resultado){
                    res.json(resultado)
                }

            ).catch(
                function (erro){
                    console.log(erro)
                    console.log("/n Houve erro ao realizar o cadastro",
                        erro.sqlMessage
                    )
                    res.status(500).json(erro.sqlMessage)
                }
            )
        }

}
    function listarusers(req,res){
        res.json(resultado)
}

module.exports ={
 autenticar,
 cadastrar
}