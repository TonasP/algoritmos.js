const prompt = require("prompt-sync")();
let frase = prompt("Insira sua frase")
let substituir = frase.replace(/a/gi, '?' )
console.log(substituir)