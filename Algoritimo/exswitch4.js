const prompt = require("prompt-sync")();
const texto = prompt ("Insira seu texto")
const textorep= texto.replace (/\s/g, '' )
const tamanhotex= textorep.length
let quest= prompt("Deseja exibir quantas letras há no texto ou deseja substituir alguma letra?")
if (quest== "exibir"){
    console.log ("o seu texto:")
    console.log (texto)
    console.log ("possui", tamanhotex, "letras no total!")
}else if (quest== "substituir"){
    let carac= prompt ("Qual caractere deseja substituir?")
    let carac2= prompt ("Por qual caractere deseja substituir?")
    const textalt= texto.replace(new RegExp(carac, 'g'), carac2 )
    const textaltT= textorep.length
    console.log ("No texto anterior:")
    console.log (texto)
    console.log ("foi substituido o caractere", "'",carac,"'", "por", "'",carac2,"'", "gerando este texto:")
    console.log (textalt)
    console.log ("E este texto possui", textaltT, "letras!" )
}