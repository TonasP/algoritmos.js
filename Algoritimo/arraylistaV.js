let maiorV=0
let quantV=0
let total=0 
let vendas = [250, 400, 150, 300, 600, 200, 550]
for (let i=0; i< vendas.length; i++){
    quantV++
    total+= vendas[i]
    if (vendas[i]> maiorV){
        maiorV= vendas[i]
    }
} let media= total / quantV
console.log ("este é o maior valor:", maiorV,)
console.log ("esta é a soma de todos os valores:", total)
console.log ("e este é a media dos valores:", media)