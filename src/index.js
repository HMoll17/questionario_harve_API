import express from "express"
import cors from "cors"
import { DataBase } from "./database/database.js"

const APP = express()
const PORT = 3333
const database = new DataBase()

APP.use(cors())
APP.use(express.json())

APP.get("/api/admin/usuario", async (req, resp) => {
    // Lista com todos os usuários
    let dados = await database.getDataUsuarios()
    resp.send(dados)
})

APP.get("/api/admin/usuario/:id", async (req, resp) => {
    // Lista com apenas um usuário específico
    let id = req.params.id
    let dados = await database.getDataUsuarios(id)
    resp.send(dados)
    if (dados.length){
        console.log("Usuario esta cadastrado");
    }else{
        console.log("Usuario não cadastrado");
    }
})

APP.post("/api/admin/usuario", async (req, resp) => {
    // Criar um novo usuário administrador
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let  dados = await database.postDataUsuarios(nome, email, senha)
    resp.send(dados)
})

APP.put("/api/admin/usuario/:id", async (req, resp) =>{
    // Atualizar um usuário
    let id = req.params.id
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let admin = req.body.admin
    let ativo = req.body.ativo
    let resultado = await database.putDataUsuarios(
        id,
        nome,
        email,
        senha,
        admin,
        ativo,
    )
    if (resultado){
        resp.send("Usuario alterado")
    }else{
        resp.send("Algo deu errado")
    }
})

APP.delete("/api/admin/usuario/:id", async (req, resp) => {
    // Deletar um usuário
    let id = req.params.id
    let resultado = await database.deleteDataUsuarios(id)
    if (resultado){
        resp.send(`Usuario com id = ${id} deletado`)
    }else{
        resp.send("Algo deu errado")
    }
})

APP.get("/api/admin/questionarios", async (req, resp) => {
    // Lista com todos os questionários
    let questionarios = await database.getQuestionarios()
    resp.send(questionarios)
})

APP.get("/api/admin/perguntas", async (req, resp) => {
    // Lista com todas as perguntas (ativas e inativas)
    let perguntas = await database.getPerguntas(true)
    resp.send(perguntas)
})

APP.get("/api/admin/alternativas", async (req, resp) => {
    // Lista todas as alternativas
    let alternativas = await database.getAlternativas()
    resp.send(alternativas)
})

APP.get("/api/questionario/perguntas", async (req, resp) => {
    // Lista todas as perguntas ativas
    let dados = await database.getPerguntas()
    resp.send(dados)
})

APP.get("/api/questionario/alternativas/:id_questao", async (req, resp) => {
    // Lista as alternativas ativas de uma questao
    let id_questao = req.params.id_questao
    let alternativas = await database.getAlternativas(id_questao)
    resp.send(alternativas)
})

APP.post("/api/questionario/usuario", async (req, resp) => {
    // Criar novo usuário não administrador
    let nome = req.body.nome
    let email = req.body.email
    let dados = await database.postDataUsuarios(nome, email)
    resp.send(dados)
})

APP.post("/api/questionario/iniciar", async (req, resp) => {
    // Criar um novo questionario
    let id_usuario = req.body.id_usuario
    let data = new Date()
    let dia = data.getDate()
    let mes = (data.getMonth() + 1)
    let ano = data.getFullYear()
    data = `${ano}-${mes}-${dia}`
    let questionario = await database.postQuestionario(id_usuario, data)
    resp.send(questionario)
})

APP.patch("/api/questionario/finalizar", async (req, resp) => {
    // Atualizar a pontuação de um questionario
    let id_questionario = req.body.id
    let pontos = req.body.pontos
    let resultado = await database.patchQuestionario(id_questionario, pontos)
    if (resultado) {
        resp.send(`Pontos: ${pontos}`)
    }else{
        resp.send("Algo deu errado")
    }
})

APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})