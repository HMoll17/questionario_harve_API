import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

class DataBase{
        
    conexoes

    constructor(){
        this.conexoes = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
        }).promise()
    }

    async getDataUsuarios() {
        try {
            const [dados] = await this.conexoes.query("SELECT * FROM usuarios")
            return dados
        } catch (error) {
            console.log(error)
        }
    }
    
    async getIndividualDataUsuarios(id){
        try {
            const [dados] = await this.conexoes.query("SELECT * FROM usuarios WHERE id = ?", [id])
            return dados
        } catch (error) {
            console.log(error)
        }
    }

    async getPerguntas(todas){
        if (todas){
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM perguntas")
                return dados
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM perguntas WHERE ativo = ?", [true])
                return dados
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getQuestionarios(){
        try {
            let [dados] = await this.conexoes.query("SELECT * FROM questionarios")
            return dados
        } catch (error) {
            console.log(error)
        }
    }
    
    async postDataUsuarios(nome, email, senha){
        if (senha){
            try {
                const [dados] = await this.conexoes.query("INSERT INTO usuarios (nome, email, senha, admin, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, senha, true, true])
                return this.getIndividualDataUsuarios(dados.insertId)
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                const [dados] = await this.conexoes.query("INSERT INTO usuarios (nome, email, senha, admin, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, null, false, false])
                return this.getIndividualDataUsuarios(dados.insertId)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async updateDataUsuarios(id, nome, email, senha, admin, ativo){
        try {
            await this.conexoes.query(`UPDATE usuarios
            SET nome = ?, email = ?, senha = ?, admin = ?, ativo = ?
            WHERE id = ?`, [
                nome,
                email,
                senha,
                admin,
                ativo,
                id
            ])
        } catch (error) {
            console.log(error)
        }
    }

    async deleteDataUsuarios(id){
        try {
            await this.conexoes.query("DELETE FROM usuarios WHERE id = ?", [id])
        } catch (error) {
            console.log(error)
        }
    }

}

export {DataBase}