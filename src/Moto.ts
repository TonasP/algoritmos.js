import { Veiculo } from "./Veiculo";
export class Moto extends Veiculo{
    protected cc: number

    constructor(placa: string, ano: number, marca: string, cor: string, marcha: string, modelo: string, cc: number) {
        super(placa, ano, marca, cor, marcha, modelo); 
        this.cc = cc;
    }
    public getInfo(): string {
        return `${super.getInfo()}, ${this.cc}`
    }
    public fugindoDaPm():string{
        return `Atenção todas as viaturas! há uma moto de cor ${this.cor}, modelo: ${this.modelo}, marca: ${this.marca}, placa: ${this.placa} dando fuga!`
    }

}
