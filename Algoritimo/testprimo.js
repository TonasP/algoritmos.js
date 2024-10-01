let primo=0 
let nprimo =0
for (let i=2; i<=13; i++){
    let ehPrimo= true;

        for (let a=2; a<i; a++){
            if (i%a===0){
            ehPrimo= false;
            break;}
        }
    if (ehPrimo){
        console.log(i, "é primo" )
        primo++
    }
    else {
        console.log (i, "não é primo")
        nprimo++
    }
} console.log ("há", primo, "numeros primos e", nprimo, "não primos")