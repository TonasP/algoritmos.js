import { Funcionario } from "../entity/Funcionario";
import { FuncionarioRepository } from "../repository/FuncionarioRepository";

export class FuncionarioService {
    private repo: FuncionarioRepository

    constructor() {
        this.repo = new FuncionarioRepository()
    }

    async listarFuncionario(): Promise<Funcionario[]> {
        return await this.repo.listarFuncionarios()
    }

    async buscarPorID(id: number): Promise<Funcionario[]> {
        let lista: Funcionario[] = []
        lista = await this.repo.buscarPorID(id)

        if (lista.length == 0) {
            throw new Error("Funcionário não encontrado!");
        }
        else {
            return lista;
        }
    }
}