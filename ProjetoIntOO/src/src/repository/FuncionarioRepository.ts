import { Funcionario } from "../entity/Funcionario";
import { Database } from "./DataBase";
import { Pool } from "pg";
export class FuncionarioRepository {
    private pool: Pool
    constructor() {
        this.pool = Database.iniciarConexao();
    }
    async listarFuncionarios(): Promise<Funcionario[]> {
        const query = 'SELECT * FROM "GymControl".funcionarios '
        const result = await this.pool.query(query)

        const listaFuncionarios: Funcionario[] = []

        for (const row of result.rows) {
            const funcionario = new Funcionario(row.id, row.nome, row.cpf, row.data_nascimento, row.funcao, row.numero_celular, row.email)
            listaFuncionarios.push(funcionario)
        }
        return listaFuncionarios

    }
    async buscarPorID(id: number): Promise<Funcionario[]> {
        const query = 'SELECT * FROM "GymControl".funcionarios where id = $1'
        const result = await this.pool.query(query, [id])

        const listaFuncionarios: Funcionario[] = []

        for (const row of result.rows) {
            const funcionario = new Funcionario(row.id, row.nome, row.cpf, row.data_nascimento, row.funcao, row.numero_celular, row.email)
            listaFuncionarios.push(funcionario)
        }
        return listaFuncionarios
    }
}