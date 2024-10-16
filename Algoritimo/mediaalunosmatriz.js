let result=0;
let soma=0;
let contador=0;
let notas = [
                [8.5, 7.0, 9.0], // Notas do Aluno  1
                [6.5, 5.0, 10.0], // Notas do Aluno 2
                [7.5, 6.5, 9.0] // Notas do Aluno 3
            ]; 
for (let i=0; i<3; i++){

    for (let j=0; j<3; j++){
    contador++;
    soma+= notas[i][j];
    }
   
    let calculo= soma/contador;
    result= calculo;
    console.log ("a média do aluno", i+1,"é", result);
    soma=0;
    contador=0;
}