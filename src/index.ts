import { Veiculo } from "./Veiculo";    
import { Moto } from "./Moto";
import { Caminhao } from "./Caminhao";
import { Onibus } from "./Onibus";


const meuVeiculo = new Veiculo("ABC-1234", 2022, "Toyota", "Preto", "Automática", "Corolla");
console.log(meuVeiculo.getInfo());


const minhaMoto = new Moto("XYZ-9876", 2023, "Honda", "Vermelha", "Manual", "CB 500", 500);
console.log(minhaMoto.getInfo());
console.log(minhaMoto.fugindoDaPm());


const meuCaminhao = new Caminhao("DEF-5678", 2020, "Volvo", "Azul", "Manual", "FH 540", 6, 20000);
console.log(meuCaminhao.getInfo());
console.log(meuCaminhao.carregarCaminhão());


const meuOnibus = new Onibus("GHI-9012", 2018, "Mercedes-Benz", "Branco", "Automática", "OF-1721", "Linha 456", 40);
console.log(meuOnibus.getInfo());
console.log(meuOnibus.pegandoPassageiro());
