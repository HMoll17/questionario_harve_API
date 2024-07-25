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

    async getDataUsuarios(id_usuario = false) {
        if (id_usuario){
            try {
                const [dados] = await this.conexoes.query("SELECT * FROM usuarios WHERE id = ?", [id_usuario])
                return dados
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const [dados] = await this.conexoes.query("SELECT * FROM usuarios")
                return dados
            } catch (error) {
                console.log(error)
            }
        }
    }

    async getPerguntas(todas = false){
        if (todas){
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM perguntas ORDER BY ordem ASC")
                return dados
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM perguntas WHERE ativo = ? ORDER BY ordem ASC", [true])
                return dados
            } catch (error) {
                console.log(error)
            }
        }
    }

    async getAlternativas(id_questao = false){
        if (id_questao){
            try {
                let [dados] = await this.conexoes.query(
                    `SELECT * FROM alternativas WHERE id_pergunta = ? AND ativo = ? ORDER by ordem ASC`,
                    [id_questao, true]
                )
                return dados
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM alternativas ORDER BY ordem ASC")
                return dados
            } catch (error) {
                console.log(error)
            }
        }
    }

    async getQuestionarios(id_questionario = false){
        if (id_questionario) {
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM questionarios WHERE id = ?", [id_questionario])
                return dados
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                let [dados] = await this.conexoes.query("SELECT * FROM questionarios")
                return dados
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    async postDataUsuarios(nome, email, senha = false){
        if (senha){
            try {
                const [dados] = await this.conexoes.query("INSERT INTO usuarios (nome, email, senha, admin, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, senha, true, true])
                return this.getDataUsuarios(dados.insertId)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const [dados] = await this.conexoes.query("INSERT INTO usuarios (nome, email, senha, admin, ativo) VALUES (?, ?, ?, ?, ?)", [nome, email, null, false, false])
                return this.getDataUsuarios(dados.insertId)
            } catch (error) {
                console.log(error)
            }
        }
    }

    async postQuestionario(id_usuario, data){
        try {
            const [dados] = await this.conexoes.query("INSERT INTO questionarios (id_usuario, total_pontos, data) values (?, ?, ?)", [id_usuario, 0, data])
            return this.getQuestionarios(dados.insertId)
        } catch (error) {
            console.log(error)
        }
    }

    async patchQuestionario(id, pontos){
        try {
            const resultado = await this.conexoes.query(
                `UPDATE questionarios
                SET total_pontos = ?
                WHERE id = ?`, [pontos, id]
            )
            return resultado
        } catch (error) {
            return false
        }
    }

    async putDataUsuarios(id, nome, email, senha, admin, ativo){
        try {
            let resultado = await this.conexoes.query(`UPDATE usuarios
            SET nome = ?, email = ?, senha = ?, admin = ?, ativo = ?
            WHERE id = ?`, [
                nome,
                email,
                senha,
                admin,
                ativo,
                id
            ])
            return resultado
        } catch (error) {
            return false
        }
    }

    async deleteDataUsuarios(id){
        try {
            let resultado = await this.conexoes.query("DELETE FROM usuarios WHERE id = ?", [id])
            return resultado
        } catch (error) {
            return false
        }
    }

}

export {DataBase}