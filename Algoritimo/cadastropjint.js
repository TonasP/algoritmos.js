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
        for (let i=0; i<ficha.length; i++)
            console.log (ficha[i])
    }
    function menu(){
        console.log ("Menu da ficha técnica")
        console.log ("  1. Visualizar fichas")
        console.log ("  2. Editar ficha ")
        console.log ("  3. Adicionar ficha ")
        console.log ("  4. Sair do menu")
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
    }
    }
    while(opcao!==4){
        menu()
    }
    

