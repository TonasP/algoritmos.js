const prompt = require("prompt-sync")();
console.log ("----------------------------------------------")
console.log ("|                   Planos                   |")
console.log ("|--------------------------------------------|")
console.log ("|                  Basico                    |")
console.log ("|                  Premium                   |")
console.log ("|                  Familiar                  |")
console.log ("|____________________________________________|" )
const menu = prompt ("Por favor, selecione um dos planos para ver os seus beneficios! ")
switch (menu) {
    case "basico":
        console.log ("Você tera acesso a filmes 480p, podendo acessar com até 1 tela por vez!!")
    break;
    case "premium":
        console.log ("Você tera acesso a filmes em 1080p, podendo acessar com até 4 telas por vez!!")
    break;
    case "familiar":
        console.log ("Você tera acesso a filmes 4k, podendo acessar com até 6 telas por vez!!")
        break;    
    default:
        console.log ("Por favor, selecione um plano válido!!")    
    }


