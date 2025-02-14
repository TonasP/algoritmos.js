import { PlanosService } from "./service/PlanosService";

import { FuncionarioService } from "./service/FuncionarioService";
const planos= new PlanosService()

const Funcionario = new FuncionarioService()
async function teste(){
    console.table(await Funcionario.buscarPorID(30))
}
teste()