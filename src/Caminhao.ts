import { Veiculo } from "./Veiculo";
export class Caminhao extends Veiculo{
    protected eixos : number
    protected pesoTotal: number

    constructor(placa: string, ano: number, marca: string, cor: string, marcha: string, modelo: string, eixos: number, pesoTotal: number) {
        super(placa, ano, marca, cor, marcha, modelo); 
        this.eixos = eixos;
        this.pesoTotal = pesoTotal;
    }
    public getInfo(): string {
        return `${super.getInfo()}, ${this.eixos}, ${this.pesoTotal}`
    }
    public carregarCaminhão():string{
        return `caminhão de placa ${this.placa}, modelo: ${this.modelo} de ${this.eixos} eixos foi carregado com a capacidade maxima de ${this.pesoTotal} kgs!`
    }
}