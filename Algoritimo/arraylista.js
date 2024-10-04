let soma= 0
let lista = ['casa', 'café', 'livro', 'senac','programador']
console.log ("------------------------------------------------------------------")
for (let i=0; i<lista.length; i++){
    let tamanho= lista[i].length
    soma+= tamanho
    console.log ("{",lista[i],"} a quantidade de letras são", tamanho, " letras neste item")
    
    
}console.log ("------------------------------------------------------------------") 
console.log ("esta é a soma do numero de letras de cada item da lista:", soma)