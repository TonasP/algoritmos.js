const prompt = require("prompt-sync")();
console.log ("As operações possiveis são +, -, *, /, por favor, utilize os simbolos!")
let n1 = parseInt(prompt("Insira o seu primeiro numero"))
let op= prompt ("Qual operação quer realizar ?")
let n2= parseInt(prompt("Insira o seu segundo numero"))
const calculo1 = (n1 + n2 )
const calculo2 =(n1 - n2)
const calculo3 = (n1 *n2)
const calculo4= (n1/n2)   
switch (op){
    case "/":{
        if (n1=0 || n2== 0){
            console.log ("Não é possivel dividir nenhum numero por 0!")}
        else{
           console.log (n1, "+" ,n2,"é igual a" ,calculo4)
        }  
     } break
    case "+":
    console.log (n1, "+" ,n2,"é igual a" ,calculo1)
    break
    case "-":
        console.log (n1, "-" ,n2,"é igual a" ,calculo2)
        break
    case "*":
        console.log (n1, "*" ,n2,"é igual a" ,calculo3)    
    default:
        console.log ("Coloque uma operação valida")
}