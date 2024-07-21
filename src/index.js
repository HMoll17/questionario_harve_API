import express from "express"
import { DataBase } from "./database/database.js"

const APP = express()
const PORT = 3333
const database = new DataBase()

APP.use(express.json())


APP.get("/api/admin/usuario", async (req, resp) => {
    let dados = await database.getDataUsuarios()
    resp.send(dados)
})

APP.get("/api/admin/usuario/:id", async (req, resp) => {
    let id = req.params.id
    let dados = await database.getIndividualDataUsuarios(id)
    resp.send(dados)
})

APP.post("/api/admin/usuario", async (req, resp) => {
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let  dados = await database.postDataUsuarios(nome, email, senha)
    resp.send(dados)
})

APP.put("/api/admin/usuario/:id", async (req, resp) =>{
    let id = req.params.id
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let admin = req.body.admin
    let ativo = req.body.ativo
    await database.updateDataUsuarios(
        id,
        nome,
        email,
        senha,
        admin,
        ativo,
    )
    resp.send("Usuario alterado")
})

APP.delete("/api/admin/usuario/:id", async (req, resp) => {
    let id = req.params.id
    await database.deleteDataUsuarios(id)
    resp.send(`Usuario com id = ${id} deletado`)
})

APP.get("/api/admin/questionarios", async (req, resp) => {
    let questionarios = await database.getQuestionarios()
    resp.send(questionarios)
})

APP.get("/api/questionario/pergunta", async (req, resp) => {
    let dados = await database.getPerguntas(true)
    resp.send(dados)
})

APP.post("/api/questionario/usuario", async (req, resp) => {
        let nome = req.body.nome
        let email = req.body.email
        let dados = await database.postDataUsuarios(nome, email, false)
        resp.send(dados)
})


APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})