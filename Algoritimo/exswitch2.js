const prompt = require("prompt-sync")();
console.log ("----------------------------------------------")
console.log ("|              Idiomas suportados            |")
console.log ("|--------------------------------------------|")
console.log ("|                  Português                 |")
console.log ("|                  English                   |")
console.log ("|                  Español                   |")
console.log ("|                  Français                  |")
console.log ("|                  Nihon-Go                  |")
console.log ("|____________________________________________|")
const idioma = prompt ("Which language would you like to switch to?")
switch (idioma) {
    case "portugues":
        console.log ("Idioma alterado para Português!")
    break;
    case "english":
        console.log ("This language is already selected!") 
    break;
    case "espanol":
        console.log ("Idioma cambiado a español!")
    break;        
    case "francais":
        console.log ("Langue changée en français!")
    break;
    case "nihon-go":
        console.log ("Gengo ga Nihon-go ni henkō sa remashita!")
    break;
    default: 
    console.log ("Language is not supported!")    
 
} 