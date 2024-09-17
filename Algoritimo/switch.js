const prompt = require("prompt-sync")();
const expr =prompt(" Which fruit would you like? ") ;

switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'bergamota':
    console.log ("Bergamotas are $2.00 a pound ")  
    break; 
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log('Sorry, we are out of' ,expr,'!.' );
}

