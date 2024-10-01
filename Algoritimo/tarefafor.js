const prompt = require("prompt-sync")();
let soma=0
const vezes= 5
for (let i=1; i<=vezes; i++){
    let numero = parseInt(prompt("Insira seu numero"))
    soma += numero
} let resultado= soma/ vezes
console.log ("esta é a soma:", soma, "e a media é:" ,resultado)