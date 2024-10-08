const prompt = require("prompt-sync")();
let ordem= []
let contador= 0
let pizzacalabresa = ["calabresa", "oregano", "mussarela"]
function receita(){
    console.log ("-------------------------------------------")
    console.log ("  Bem vindo ao livro de receitas ")
    console.log ("     Pizza de calabresa")
    console.log ("     O que deseja fazer ?")
    console.log ("  1. Ver a receita"  )
    console.log ("  2. Adicionar item a receita")
    console.log ("  3. Remover item da receita")
    console.log ("  4. Ver quantos items vão na receita")
    console.log ("  5. Quantidade de fatias da pizza")
    console.log ("  6. Fechar o livro")
    console.log ("-------------------------------------------")
    let escolha = parseInt(prompt("Por favor, escolha uma das opções acima"))
    switch (escolha){
        case 1:
            ordem=pizzacalabresa.sort()
            console.log("------------------------")
            console.log("Lista de ingredientes (em ordem alfabetica)")
            for (let i=0; i<ordem.length; i++){
                console.log (ordem[i])}
            console.log ("-----------------------")    
            return receita()
            
        
        case 2:
         for (let i=0; i<pizzacalabresa.length; i++){
            let adicionar = (prompt ("Digite o item que deseja adicionar, pressione 0 caso queira parar"))
            let existente = pizzacalabresa.indexOf(adicionar)
                if (existente===0){
                    console.log ("o item que deseja adicionar já existe!")
                    return receita()
                }
                if (adicionar=="0"){
                    return  receita()
                } pizzacalabresa[pizzacalabresa.length]=adicionar}
                    break;
        case 3:
            for (let i=0; i<pizzacalabresa.length; i++){
                let remover = prompt("Qual item deseja remover da receita?, caso não queira remover mais nenhum item, deixe o campo em branco!")
                let procurar = pizzacalabresa.findIndex(item => item ==remover)
                    if (procurar !== -1){
                        pizzacalabresa.splice(procurar, 1)
                        console.log ("o item", remover, "foi removido")
                
                    }
                    else{
                        console.log ("O item inserido não existia, logo, não foi removido")
                    } 
                if (remover.length==0){
                    break
                }
            }
        return receita()
    
        case 4:
            for (let i=0; i<pizzacalabresa.length; i++){
             contador++
            }  console.log ("há", contador, "items nesta receita")
             contador=0   
        return receita()

        case 5:
            console.log ("Quantidade de fatias correspondente ao tamanho:")
            console.log ("Pizza Pequena: 8 fatias")
            console.log ("Pizza Média: 12 fatias")
            console.log ("Pizza Grande: 16 fatias")
            console.log ("Pizza Familia: 20 fatias")
            return receita()
        case 6:
            console.log ("Você decidiu fechar o livro, tenha um bom dia caro cozinheiro!!")        
        break 
        default:
            console.log ("Insira uma opção valida")
        return receita()
    } 
     
} receita()