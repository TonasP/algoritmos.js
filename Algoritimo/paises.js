const prompt = require("prompt-sync")();
let tamanho=0
let nome =""
let pergunta=""
const paises = [
    ["Brasil", 213993437],
    ["Estados Unidos", 331002651],
    ["China", 1439323776],
    ["Índia", 1380004385],
    ["Japão", 126476461],
    ["Alemanha", 83783942],
    ["França", 65273511],
    ["Reino Unido", 67886011],
    ["Itália", 60244639],
    ["Canadá", 37742154]
];
function exibir(){
    let ordenar= paises.sort((a, b)=> b[1] - a[1])
    console.table(ordenar)
}
function pesquisar(){
 let procpais= prompt("Qual pais deseja saber a população?")
 for (let i=0; i<paises.length; i++){
    for (let j=0; j<paises.length; j++){
        if (paises[i][0]===procpais){
            console.log ("o pais que você procurou:", procpais, "tem", paises[i][1], "habitantes")
           break
        }
    }         
 }
}  
function maiorp(){
    for (let i=0; i<paises.length; i++){
        for (let j=0; j<paises.length; j++){
            
           if (paises[i][j]> tamanho){
            tamanho=paises[i][1]
            nome= paises[i][0]
           }
         else {
            tamanho=tamanho
         }
        }       
    }
    console.log ("O maior pais é", nome, "com", tamanho, "habitantes no total!!")
} 
function inserir(){
    let pais= prompt ("Insira o nome do seu pais")
    let numero= parseInt(prompt("Insira quantos habitantes há em seu pais"))
    let existente= paises.findIndex(item=> item[0]===pais)
        if (existente===-1){
            paises.push([pais, numero])
            console.log ("O pais:|", pais, "|que possui", numero, "habitantes foi adicionado a lista!")
            
        }
            
        else {
            console.log ("O pais já existe na lista")
            
        }
            
    } return opções()
    


function deletar(){
    let paisdelet= prompt ("Qual pais deseja remover ?")
    let indice = -1
    for(let i=0; i<paises.length; i++){
        if(paises[i][0] === paisdelet){
           indice = i;
           paises.splice(indice, 1)
        }
    
    } 
    console.log ("O pais:", paisdelet, "foi excluido do menu")
}
function opções(){
    console.log ("Menu de Opções")
    console.log (" 1. Pesquisar pais ")
    console.log (" 2. Exibir a tabela de paises em ordem")
    console.log (" 3. Ver qual o maior pais")
    console.log (" 4. Inserir um pais ")
    console.log (" 5. Deletar pais")
    console.log (" 6. Sair")
    pergunta = parseInt(prompt("Qual opção deseja ?"))

switch (pergunta){
    case 1: 
     pesquisar()
      return opções()
    case 2:
      exibir()
      return opções()
    case 3:
        maiorp()
        return opções()
    case 4:
        inserir()
        return opções()
    case 5:
        deletar()
        return opções()
    case 6:
        console.log("Você decidiu sair!")
        break
    default:
        console.log ("Insira uma opção valida!")
        return opções()
}
}
   while (pergunta!==6){
    opções()
   }     

 

 
