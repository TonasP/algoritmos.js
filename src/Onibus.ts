import { Veiculo } from "./Veiculo"; 
export class Onibus extends Veiculo{
    protected linha: string
    protected capacidade: number
   
    constructor(placa: string, ano: number, marca: string, cor: string, marcha: string, modelo: string, linha: string, capacidade: number) {
        super(placa, ano, marca, cor, marcha, modelo);
        this.linha = linha;
        this.capacidade = capacidade;
    }
    public getInfo(): string {
        return `${super.getInfo()}, ${this.linha}, ${this.capacidade}`
    }
    public pegandoPassageiro():string{
        return `Onibus de linha ${this.linha} pegou um passageiro, restando 10 pessoas para a capacidade maxima de ${this.capacidade} `
    }
}