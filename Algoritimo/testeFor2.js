const prompt = require("prompt-sync")();
for (let i=1; i <=10; i++){
   console.log ("---------------------------------------")
   for (let a=1; a<=10; a++){
    console.log (i, "x", a, ":", i * a)
   }
}