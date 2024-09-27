const prompt = require("prompt-sync")();
console.log("1- Cadastrar produtos no estoque ")
console.log("2- Exibir o estoque ")
function estoque(){
   console.log ("Você será redirecionado para a aba de exibição do estoque!")
   console.log ("---------------------------------------------------------------")
   console.log ("| codigo  | nome | quantidade (UNI)| validade | ")
   console.log ("| 0075498 | ervilha em conserva fungini | 60 UNI | 07/04/25 |")
   console.log("| 0081234 | milho verde predilecta | 70 UNI | 15/05/26 |")
   console.log("| 0098765 | feijão carioca camil | 50 UNI  | 22/11/24 |")
   console.log("| 0012456 | palmito em conserva hemmer | 80 UNI| 13/08/25 |")
   console.log("| 0054321 | ervilha congelada daucy | 65 UNI | 09/12/24 |")
   console.log("| 0027890 | azeitona preta compal | 55 UNI | 28/03/26 |")
   console.log("| 0034567 | grão-de-bico cozido camil | 75 UNI | 05/01/25 |")
   console.log("| 0092345 | tomate pelado la pastina | 90 UNI | 16/06/24 |")
   console.log("| 0047891 | cenoura em cubos jurema | 60 UNI | 20/10/25 |")
   console.log("| 0065432 | beterraba cozida fugini | 70 UNI | 12/02/26 |")
   console.log("| 0089753 | cogumelo fatiado tozzi | 85 UNI| 30/07/25 |")
}

function cadastro(resp){
   console.log ("Você será redirecionado para a area de cadastro de produtos!")
   console.log ("-------------------------------------------------------------")
   resp = prompt ("Quem é o responsavel pelo registro ?")
   let codigo =prompt  ("Insira o codigo do produto")
   let nomep = prompt  ("Insira o nome do produto")
   let quant  = prompt ("Insira a quantidade do produto")
   let valid = prompt ("Insira a validade do produto")
      console.log ("| codigo  | nome | quantidade (UNI)| validade | ")
     console.log ("|",codigo,  "|",nomep, "|" ,quant,"UNI", "|" ,valid, "|" )
     console.log ("Cadastro realizado por", resp)
}
let escolha= parseInt(prompt ("Por favor, escolha uma das funções acima!"))
switch (escolha){
 case 1:
    cadastro()
    break;
 case 2:
    estoque()
    break;
 default:
    console.log ("Por favor, escolha uma função valida")
} 
