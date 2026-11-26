require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const userController = require("./controllers/user.controller");
const exRoutes = require("./routes/ex.routes")
const dietaRoutes = require("./routes/dieta.routes")
const pesoRoutes = require("./routes/peso.routes")



const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, "../public")));


app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cadastro.html"));
});


app.use(userRoutes.expressrouter);
app.use("/", exRoutes.expressrouter)
app.use("/", dietaRoutes.expressrouter)
app.use("/", pesoRoutes.expressrouter)





app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`👉 Acesse: http://localhost:${port}/cadastro`);
});