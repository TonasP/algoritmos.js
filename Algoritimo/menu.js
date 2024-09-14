const prompt = require("prompt-sync")();
let atendimento= prompt  ("Vendemos milkshake e churros, o que você quer? ")
if (atendimento== "milkshake"){
    console.log ("----------------------------------------------")
    console.log ("          Barraca do Zé da bulacha")
    console.log ("----------------------------------------------")
    console.log ("- Milkshake 200ml= R$6,00")
    console.log ("- Milkshake 400ml= R$10,00")
    console.log ("- Milkshake 600ml= R$14,00")
    let tamanho= parseInt(prompt ("Você quer o Milkshake de 200, 400 ou 600 ml? "))
    if (tamanho== 200){
        console.log ("Vai ficar R$6,00 padrinho")
        }else if (tamanho == 400){
            console.log ("Vai ficar R$10,00 cupincha")
            }else if (tamanho == 600){
                console.log ("Vai ficar R$14,00 patrão")
                } console.log ("Obrigado por comprar com o Zé da bulacha")
                return
}
if (atendimento== "churros"){
    console.log ("----------------------------------------------")
    console.log ("          Barraca do Zé da bulacha")
    console.log ("----------------------------------------------")
    console.log ("- Churros de chocolate preto= R$10,00")
    console.log ("- Churros de chocolate branco= R$10,00")
    console.log ("- Churros de nutella= R$14,00")
    let sabor = prompt("Qual sabor você quer? ")
        if (sabor== "chocolate preto"|| sabor == "chocolate branco"){
            console.log ("Vai ficar R$10,00 campeão")
            }else if (sabor== "nutella"){
                console.log ("Vai ficar R$14,00 meu chapa")
                } console.log ("Obrigado por comprar com o Zé da bulacha")
                return
}
