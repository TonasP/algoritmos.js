let primo= 0
let nprimo=0
for (let numero = 2; numero <= 13; numero++) {
    let ehPrimo = true;


    for (let divisor = 2; divisor < numero; divisor++) {
        if (numero % divisor === 0) {
            ehPrimo = false;
            break;  // Se encontrar um divisor, sai do loop
        }
    }    if (ehPrimo) {
          console.log(numero + " é primo");
            primo++
    }
    else   {
        console.log(numero + " não  é primo");
        nprimo++}   
   
} console.log ("há", primo, "numeros primos e", nprimo, "não primos")


