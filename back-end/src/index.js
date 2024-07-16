import express from "express"
import { getData, getIndividualData, postData, deleteData } from "./database/database.js"

const APP = express()
const PORT = 3333
APP.use(express.json())


APP.get("/api/usuario", async (req, resp) => {
    let dados = await getData()
    console.log(dados)
    resp.send(dados)
})

APP.get("/api/usuario/:id", async (req, resp) => {
    let id = req.params.id
    let dados = await getIndividualData(id)
    console.log(dados)
    resp.send(dados)
})

APP.post("/api/usuario", async (req, resp) => {
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
   let  dados = await postData(nome, email, senha)
    console.log(dados)
    resp.send(dados)
})

APP.delete("/api/usuario/:id", async (req, resp) => {
    let id = req.params.id
    await deleteData(id)
    resp.send(`Usuario com id = ${id} deletado`)
})

APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})