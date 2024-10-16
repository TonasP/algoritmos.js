let valor= [81] //esta array se mantem em um indice só
let sequencia= [81] // esta array irá armazenar os resultados do calculo

for (let i=0; i<sequencia.length; i++){
    let calculo = valor/ 3 //irá utilizar o valor do primeiro arrai (valor) e dividir por 3
    valor= calculo //transformará o valor da array (valor) no resultado do calculo da variavel "calculo"
    sequencia.push(valor) //irá inserir o valor da variavel "valor" na array "sequencia"
    if (valor==1){ // assim que o calculo chegar a 1, o codigo irá parar, impedindo uma geração de zeros infinitos
        break
    }
    
   
} console.log (sequencia)
   