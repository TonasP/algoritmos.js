export class Veiculo{
    protected placa: string
    protected ano: number
    protected marca: string
    protected cor: string
    protected marcha: string
    protected modelo : string

    constructor(placa: string, ano: number, marca: string, cor: string, marcha: string, modelo: string) {
        this.placa = placa;
        this.ano = ano;
        this.marca = marca;
        this.marcha = marcha
        this.cor = cor
        this.modelo = modelo
    }
    public getInfo(): string {
        return `Placa: ${this.placa}, Ano: ${this.ano}, Marca: ${this.marca}, Cor: ${this.cor}, Marcha: ${this.marcha}, Modelo: ${this.modelo}`;
    }
}