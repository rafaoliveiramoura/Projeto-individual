require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const userController = require("./controllers/user.controller");

const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para aceitar JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })); // Para aceitar dados de formulários comuns

// Servir arquivos estáticos (HTML, CSS, JS, Imagens) da pasta public
app.use(express.static(path.join(__dirname, "../public")));

// Rota principal para abrir a tela de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cadastro.html"));
});

// Montagem das rotas de usuário
app.use(userRoutes.expressrouter);

// Rota para processar o cadastro (removida duplicata se existir)
// app.post('/register', userController.cadastrar);


app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`👉 Acesse: http://localhost:${port}/cadastro`);
});