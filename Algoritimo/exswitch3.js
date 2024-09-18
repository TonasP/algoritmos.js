const prompt = require("prompt-sync")();
//a function calculadora() irá realizar o todo o calculo e checagem
function calculadora(){
    console.log ("As operações possiveis são +, -, *, /, por favor, utilize os simbolos!")
    let n1 = parseInt(prompt("Insira o seu primeiro numero"))
    let op= prompt ("Qual operação quer realizar ?")
    let n2= parseInt(prompt("Insira o seu segundo numero"))
    // os calculos irão realizar os devidos calculos
    const calculo1 = (n1 + n2 )
    const calculo2 =(n1 - n2)
    const calculo3 = (n1 *n2)
    const calculo4= (n1/n2)   
    // este if irá verificar se os numeros inseridos são validos
    // caso este if seja verdadeiro, ou seja, numero invalido, ele ira exibir a mensagem e irá utilizar a função return para puxar a function novamente
    if (isNaN(n1)|| isNaN(n2)){
        console.log ("Por favor, insira um numero valido!")
        return calculadora()}
        else { 
        // este switch vai verificar os simbolos das operações e exibir os devidos numeros e calculos 
        switch (op){
            case "/":{
                //este if verifica se os numeros estão sendo dividos por 0, caso estejam, ira exibir a mensagem e utilizará o return para puxar a function novamente
                if (n1==0 || n2== 0){
                    console.log ("Não é possivel dividir nenhum numero por 0!")
                    return calculadora()}
                else{
                console.log (n1, "+" ,n2,"é igual a" ,calculo4)
                }  
            } break
            case "+":
            console.log (n1, "+" ,n2,"é igual a" ,calculo1)
            break
            case "-":
                console.log (n1, "-" ,n2,"é igual a" ,calculo2)
                break
            case "*":
                console.log (n1, "*" ,n2,"é igual a" ,calculo3)    
             // caso a operação seja invalida, irá cair no default, que irá exibir a mensagem e utilizar o return para puxar a function novamente,
             // realizando todas as ações novamente até que a operação inserida seja valida
            default:
                console.log ("Coloque uma operação valida")
                return calculadora()
        }
    }
}  calculadora()
