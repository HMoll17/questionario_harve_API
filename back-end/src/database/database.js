import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const conexoes = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}).promise()

async function getData() {
    try {
        const [dados] = await conexoes.query("SELECT * FROM usuarios")
        return dados
    } catch (error) {
        console.log(error)
    }
}

async function getIndividualData(id){
    try {
        const [dados] = await conexoes.query("SELECT * FROM usuarios WHERE id = ?", [id])
        return dados
    } catch (error) {
        console.log(error)
    }
}

async function postData(nome, email, senha){
    try {
        const [resultado] = await conexoes.query("INSERT INTO usuarios (nome, email, senha, admin, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, senha, true, true])
        return getIndividualData(resultado.insertId)
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id){
    try {
        await conexoes.query("DELETE FROM usuarios WHERE id = ?", [id])
    } catch (error) {
        console.log(error)
    }
}

async function updateData(){
    try {
        
    } catch (error) {
        console.log(error)
    }
}

export {getData, getIndividualData, postData, deleteData}