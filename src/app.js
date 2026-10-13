const express = require("express")
const cors = require("cors")
const port = 3300

const app = express()

app.listen (port, () => {
    console.log(`Server rodando em https://localhost:${port}`)
})