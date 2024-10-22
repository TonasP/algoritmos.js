const tabela= 
[
    {nomeCliente:"Cliente1", gastoTotal: 10000 },
    {nomeCliente:"Cliente2", gastoTotal: 5000}
] 
function mostrarDados(){
    console.table(tabela)
}
function inserirDado(pNome, pGasto){
    tabela.push({nomeCliente:pNome, gastoTotal:pGasto})

}
module.exports = {mostrarDados, inserirDado }