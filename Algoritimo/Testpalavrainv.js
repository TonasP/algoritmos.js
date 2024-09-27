const prompt = require("prompt-sync")();
let palavra=prompt("Insira a palavra/frase de deseja inverter!")
let palavrainv= palavra.split("").reverse().join("")
console.log ("Aqui está sua palavra invertida:", palavrainv)