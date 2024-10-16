
let array = [12, 3, 45, 7, 22, ]
let numm= array[0]
let numM= array[0]
for (let i=0; i<array.length; i++){
   
    if ( array[i]> numM ){
        numM= array[i]
    }
        if ( array[i]< numm){
            numm= array[i]    
        }
}

 console.log ("o maior numero é",numM)
    console.log ("o menor numero é",numm)