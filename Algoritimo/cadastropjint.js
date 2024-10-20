const prompt = require("prompt-sync")();
let opcao=0 
let ficha =[
     {Nome:"Corre",tipolinha1:"Poliester",tipolinha2:"Poliester", cor1:"Red Velvet", cor2:"Snow", cor3:"--", lowmelt:"Clear",monofio1:"Eletric Orange", monofio2:"--", quantidade:"2 pares, 1D" }
]

function visualizar(){
    console.table(ficha)
} 
function editar(){
    let nome= prompt("Qual o nome do calçado correspondente a ficha que quer alterar?")
    let indice= ficha.findIndex(f=> f.Nome= nome)
     if (indice===-1){
        console.log ("A ficha não foi encontrada!")
        return menu()
     }
    let coluna= prompt("Qual o nome da coluna que quer alterar?")
     if (ficha[indice][coluna]==undefined){
        console.log ("Coluna não encontrada!")
        return menu()
     }
    let alteracao = prompt ("Por o que quer substituir esta coluna?")
     ficha[indice][coluna]=alteracao  
     console.log ("A alteração de", coluna, "para", alteracao, "foi efetuada!")
    }
    function adicionar(){
      let novoItem = {};
      console.log ("Caso o queira deixar o espaço vazio, digite --")
      novoItem.Nome = prompt("Insira o nome do calçado:");
      novoItem.tipolinha1 = prompt("Insira o tipo de linha 1:");
      novoItem.tipolinha2 = prompt("Insira o tipo de linha 2:");
      novoItem.cor1 = prompt("Insira a cor 1:");
      novoItem.cor2 = prompt("Insira a cor 2:");
      novoItem.cor3 = prompt("Insira a cor 3:");
      novoItem.lowmelt = prompt("Insira o lowmelt:");
      novoItem.monofio1 = prompt("Insira o monofio 1:");
      novoItem.monofio2 = prompt("Insira o monofio 2:");
      novoItem.quantidade = prompt("Insira a quantidade:");
  
      ficha.push(novoItem);
      console.log("Nova ficha adicionada com sucesso!");
  }   
    function remover(){
      let nome= prompt("Qual o nome do calçado correspondente a ficha que quer remover?")
      let indice= ficha.findIndex(f=> f.Nome= nome)
     if (indice===-1){
        console.log ("A ficha não foi encontrada!")
        return menu()
     }
      
        ficha.splice(indice, 1)
        console.log ("A ficha cujo o nome era", nome, "foi removida")
    
      
    }    

    function menu(){
        console.log ("Menu da ficha técnica")
        console.log ("  1. Visualizar fichas")
        console.log ("  2. Editar ficha ")
        console.log ("  3. Adicionar ficha ")
        console.log ("  4. Remover ficha")
        console.log ("  5. Sair do menu")
        opcao= parseInt(prompt("Qual ação deseja realizar?"))
    switch (opcao){
        case 1:
          visualizar()
          return menu()
        case 2: 
          editar()
          return menu()  
        case 3:
            adicionar()
            return menu()  
        case 4:
          remover()
          return menu()
           
        case 5:
          console.log("Você saiu do menu")
          break

        default:
          console.log("Insira uma opção valida!")
          return menu()    
          }    
    }
    while(opcao!==5){
        menu()
    }
    

