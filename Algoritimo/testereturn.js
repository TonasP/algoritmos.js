const prompt = require("prompt-sync")();
let cargo=prompt ("Qual seu cargo?")
    if (cargo !=="adm"){
        console.log ("invalido")
        return
    }else {
        console.log("valido")
    }
console.log("Fim")