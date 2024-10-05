const prompt = require("prompt-sync")();

let  listaSupermercado = ["maçã", "banana", "leite", "pão", "arroz"]
let opcao = ''
function mostrarlista(){
    console.log ("       Menu")
    console.log (" 1. Adicionar item")
    console.log (" 2. Listar itens")
    console.log (" 3. Sair")
    opcao= parseInt(prompt("qual das opções acima deseja ?" ))
    switch (opcao){

        case 1: 
           for (let i=0; i<listaSupermercado.length; i++){
            console.log ("--caso naõ tenha mais itens que deseja adicionar, aperte 0 para sair")
            let item = prompt ("Qual o nome do item que deseja adicionar?")
            if (item.includes(0)){
                return mostrarlista()}
            
            listaSupermercado[listaSupermercado.length]= item}
            break;
        case 2: 
            for (let i=0; i<listaSupermercado.length; i++){
                console.log (listaSupermercado[i])
            }
     
        break;

        case 3:
            console.log ("Volte sempre, colega!")
        break

        default:
            console.log ("Insira uma opção valida!")
        break    
    }    
} while(opcao !==3 ){
    mostrarlista()
}  