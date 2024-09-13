const prompt = require("prompt-sync")();
function numeroaleatorio(){
    return Math.floor((Math.random()*20)+1)
}
let numero =parseInt(prompt ("Insira um numero entre 0 a 10"))
let adversario = numeroaleatorio()
let calculo = numero + adversario
if (numero >=0 && numero<=10 ){
    let escolha = prompt("Você quer par ou impar?").toLowerCase()
    if (escolha==="par"){
        if (calculo % 2 == 0){ 
            console.log ("Você escolheu par e o numero", numero,", O adversario", adversario,", o resultado foi par, você ganhou")}
            else{
                console.log ("Você escolheu par e o numero", numero,", O adversario", adversario,", o resultado foi impar, você perdeu!")
                }
    }   
        else if (escolha==="impar" ){
            if (calculo % 2!== 0 ){
                console.log ("Você escolheu impar e o numero", numero,", O adversario",adversario,", o resultado foi impar, você ganhou!")
            } else{
                console.log ("Você escolheu impar e o numero", numero,", O adversario", adversario, ", o resultado foi par, você perdeu")
            }
        }
}    
else {
    console.log ("Você deve escolher um numero entre 0 a 10!!")
}