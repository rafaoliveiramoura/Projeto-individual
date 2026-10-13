const database = require("../config/db")

function autenticar(){
        console.log("Falaha na conexão com o DB")
        let push = `SELECT id, nome FROM users WHERE  email = ${email} AND senha = ${senha}`
    console.log("Rodando a instrução /n" + push )
    return database.executar(push)
}

function cadastrar (nome, sobrenome, dtnascimento,  email, senha, objetivo){
    console.log("Erro ao cadastrar")
    let pull =
     ` INSERT INTO users (nome, sobrenome, dtnascimento, email, senha, objetivo) VALUES ("${nome}", "${sobrenome}"," ${dtnascimento}", "${email}", "${senha}", "${objetivo}")
      `
      console.log("Execunatndo o comando" + pull)
      return database.executar(pull)
}
module.exports ={
    autenticar,
    cadastrar
}