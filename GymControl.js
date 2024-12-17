const prompt = require("prompt-sync")();
const { Pool } = require('pg');
// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',       // Substitua pelo seu usuário
    host: 'localhost',         // Host do PostgreSQL - ip da própria máquina
    database: 'ProjetoIntegrador',   // Nome do banco de dados
    password: '1234',     // Substitua pela sua senha
    port: 5432                 // Porta do PostgreSQL
});

// Funções do Cliente
async function deletarcliente(){
    try{
        let id= await procurarcliente()
        const query = 'delete  from "GymControl".clientes where id = $1'
        const result = await pool.query(query,[id])
    }
    catch{
        console.log("Erro ao deletar cliente!")
    }
}
async function atualizarcliente(){
    try{
        let id= await  procurarcliente()
        let coluna= prompt("O que deseja atualizar?")
        let registro = prompt ("Para o que deseja atualizar?")
        const query = 'update "GymControl".clientes set $1 =$2  where id = $3'
        const result = pool.query(query,[coluna, registro, id])
        console.log ("O cliente foi atualizado!")
    }
    catch{
        console.log ("Erro ao atualizar o cliente")
    }
}
async function vsclientes(){
    try{
        const query = 'select * from "GymControl".clientes'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarcliente(){
    try{
        let nome= prompt ("Qual o nome do cliente?")
        const query = 'SELECT * from "GymControl".clientes where nome= $1 '
        const result = await pool.query(query,[nome])
        console.table (result.rows)
        return result.rows[0].id
    }
    catch{
        console.log ("Erro ao procurar o cliente")
    }
}
async function cadastrarcliente(){
    try{
        let nome= prompt ("Qual o nome do cliente?")
        let cpf = prompt ("Qual o CPF do cliente?")
        let data= prompt ("Qual a data de nascimento do cliente?")
        let plano= prompt ("Qual plano o cliente escolheu?")
        let numero = prompt ("Qual numero de celular do cliente")
        let email= prompt ("Qual o email do cliente?")
        const query = 'INSERT into "GymControl".clientes ( nome, cpf, data_nascimento, plano_id, numero_celular, email) values ($1, $2, $3, $4, $5, $6)'
        const result = await pool.query(query,[nome, cpf, data, plano, numero, email])
        console.log ("Cliente inserido com sucesso!!")
    }catch{
        console.log("Erro Inesperado!")
    }
}

//Funções para o Funcionário
async function deletarfuncionário(){
    try{
        let id= await procurarfuncionario()
        const query = 'delete  from "GymControl".funcionarios where id = $1'
        const result = await pool.query(query,[id])
    }
    catch{
        console.log("Erro ao deletar funcionário")
    }
}
async function vsfuncionarios(){
    try{
        const query = 'select * from "GymControl".funcionarios'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarfuncionario(){
    try{
        let nome= prompt ("Qual o nome do funcionário ?")
        const query = 'SELECT * from "GymControl".funcionarios where nome= $1 '
        const result = await pool.query(query,[nome])
        console.table (result.rows)
        return result.rows[0].id
    }
    catch{
        console.log ("Erro ao procurar o funcionário")
    }
}
async function cadastrarfuncionario(){
    try{
       let nome = prompt ("Insiral o nome do funcionário")
       let cpf= prompt ("Insira o CPF do funcionário") 
       let data= prompt ("Insira a data de nascimento do funcionário")
       let funcao= prompt ("Qual a função do funcionário?")
       let numero= prompt ("Insira o numero de celular do funcionário")
       let email= prompt ("Insira o email do funcionário")
       const query = 'INSERT INTO "GymControl".funcionarios(nome, cpf, data_nascimento, funcao, numero_celular, email) VALUES ( $1, $2, $3, $4, $5, $6);'
       const result = await pool.query(query,[nome, cpf, data, funcao, numero, email])
       console.log ("Funcionário cadastrado com sucesso")

    }catch {
        console.log ("Erro ao cadastrar funcionário!")
    }
}
async function atualizarfuncionario(){
    try{
        let id= await procurarfuncionario() 
        let coluna= prompt("O que deseja atualizar?")
        let registro = prompt ("Para o que deseja atualizar?")
        const query = 'update "GymControl".funcionarios set $1=$2 where id=$3'
        const result = pool.query(query,[coluna, registro, id])
        console.log ("O funcionário foi atualizado!")
    }
    catch{
        console.log("Erro ao atualizar o funcionário")
    }
}
//Funções para os serviços

async function deletarservico(){
    try{
        let id= await procurarservico()
        const query = 'delete  from "GymControl".servico where id = $1'
        const result = await pool.query(query,[id])
    }
    catch{
        console.log("Erro ao deletar o serviço")
    }
}
async function atualizarservico(){
    try{
        let id= await procurarservico()
        let coluna= prompt("O que deseja atualizar?")
        let registro = prompt ("Para o que deseja atualizar?")
        const query = 'update "GymControl".servicos set $1=$2 where id=$3'
        const result = pool.query(query,[coluna, registro, id])
        console.log ("O serviço foi atualizado!")
    }
    catch {
        console.log ("Erro ao atualizar o serviço")
    }
}
async function vsservicos(){
    try{
        const query = 'select * from "GymControl".servicos'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarservico(){
    try{
        let nome= await procurarcliente()
        const query = 'select  servicos.* from "GymControl".servicos join "GymControl".clientes on servicos.id_cliente = clientes.id where clientes.nome = $1'
        const result = await pool.query(query,[nome])
        console.log (result.rows)
        return result.rows[0].id
    }
    catch{
        console.log ("Erro ao procurar o serviço")
    }
}
async function cadastrarservico(){
    try{
        let cliente= await procurarcliente()
        let funcionario = await procurarfuncionario()
        let tipo= prompt ("Qual o tipo do serviço?")
        let data = prompt ("Quando ocorreu o serviço?")
        let valor = parseInt(prompt ("Qual o valor do serviço"))
        const query = 'INSERT INTO "GymControl".servicos( "id_funcionário", id_cliente, tipo_servico, data_servico, valor) VALUES ( $1, $2, $3, $4, $5)'
        const result = await pool.query(query,[cliente, funcionario, tipo, data, valor])

    }catch {
        console.log ("Erro ao cadastrar serviço!")
    }
}
//Funções para os pagamentos
async function deletarpagamento(){
    try{
        let id= await procurarpagamento()
        const query = 'delete  from "GymControl".pagamentos where id = $1'
        const result = await pool.query(query,[id])
    }
    catch{
        console.log("Erro ao deletar pagamento")
    }
}
async function atualizarpagamento(){
    try{
        let id= await procurarpagamento()
        let coluna= prompt("O que deseja atualizar?")
        let registro = prompt ("Para o que deseja atualizar?")
        const query = 'update "GymControl".pagamentos set $1=$2 where id=$3'
        const result = pool.query(query,[coluna, registro, id])
        console.log ("O pagamento foi atualizado!")
    }
    catch{
        console.log("Erro ao atualizar o pagamento!")
    }
}
async function vspagamentos(){
    try{
        const query = 'select * from "GymControl".pagamentos'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarpagamento(){
    try{
        let id= await procurarcliente()
        let query = 'select pagamentos.* from "GymControl".pagamentos join "GymControl".servicos on servicos.id = pagamentos.id_servico join "GymControl".clientes on clientes.id = servicos.id_cliente where clientes.id = $1'
        let result = await pool.query(query, [id])
        console.table (result.rows)
        return result.rows[0].id
    }
    catch{
        console.log ("Erro ao procurar pagamento!")
    }
}
async function adicionarpagamento(){
    try{
        let servico= await procurarservico()
        let valor= prompt ("Insira o valor total do(s) serviço")
        let pagamento = prompt ("Qual a forma de pagamento?")
        const query = 'INSERT INTO "GymControl".pagamentos( id_servico, valor_total, forma_pagamento) VALUES ( $1, $2, $3)'
        const result = await pool.query(query,[servico, valor, pagamento])
        console.log ("Pagamento adicionado!!")
    }
    catch{
        console.log ("Erro ao adicionar o pagamento")
    }
}
//Funções para os planos
async function vsplanos(){
    try{
        const query = 'select * from "GymControl".planos'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}

//Funções para os menus 
async function deletar(){
    console.log("1- Deletar cliente");
    console.log("2- Deletar funcionário");
    console.log("3- Deletar serviço");
    console.log("4- Deletar pagamento");
    console.log("5- Retornar ao menu principal");
    let opcao = parseInt(prompt("Selecione uma das opções"))
    switch (opcao){
        case 1:
            await deletarcliente()
            return deletar()
        case 2:
            await deletarfuncionário()
            return deletar()
        case 3:
            await deletarservico()
            return deletar()
        case 4:
            await deletarpagamento()
            return deletar()
        case 5:
            console.log ("Retornando ao menu principal")
            return
    }

}

async function visualizar(){
    try {
        console.log ("1- Tabela de clientes")
        console.log ("2- Tabela de funcionários")
        console.log ("3- Tabela de serviços")
        console.log ("4- Tabela de planos")
        console.log ("5- Tabela de pagamentos")
        console.log ("6- Retornar ao menu principal")
        let opcao= parseInt(prompt("Selecione a tabela que deseja acessar!"))
        switch (opcao){
            case 1:
                await vsclientes()
                return visualizar()
            case 2:
                await vsfuncionarios()
                return visualizar()
            case 3: 
                await vsservicos()
                return visualizar()
            case 4: 
                await vsplanos()
                return visualizar()
            case 5: 
                await vspagamentos()
                return visualizar()
            case 6: 
                console.log("Retornando ao menu principal!")
                return
            default:
                console.log("Opção inválida!")
                return visualizar()
        }
    }
    catch{
        console.log ("Não foi possivel visualizar as tabelas!")
    }
}

async function atualizar(){
    console.log("1- Atualizar cliente");
    console.log("2- Atualizar funcionário");
    console.log("3- Atualizar serviço");
    console.log("4- Atualizar pagamento");
    console.log("5- Retornar ao menu principal");
    let opcao = parseInt(prompt("Selecione uma das opções"))
    switch (opcao){
        case 1:
           await atualizarcliente()
           return atualizar()
        case 2:
           await atualizarfuncionario()
           return atualizar()
        case 3:
            await atualizarservico()
            return atualizar()
        case 4: 
            await atualizarpagamento()
            return atualizar()
    }
}

async function cadastrar(){

    console.log("1- Cadastrar cliente");
    console.log("2- Cadastrar funcionário");
    console.log("3- Cadastrar serviço");
    console.log("4- Cadastrar pagamento");
    console.log("5- Retornar ao menu principal");
    let opcao = parseInt(prompt("Selecione uma das opções"))

switch (opcao) {
    case 1:
        await cadastrarcliente()
        return cadastrar()
    case 2:     
        await cadastrarfuncionario
        return cadastrar()
      
    case 3:
        await cadastrarservico()
        return cadastrar()
        
    case 4:
        await adicionarpagamento()
        return cadastrar()
       
    case 5:
        console.log ("Retornando ao menu principal")
        return
        
    default:
        console.log("Opção inválida");
}
}

async function procurar(){

console.log("1- Procurar cliente");
console.log("2- Procurar funcionário");
console.log("3- Procurar serviço");
console.log("4- Procurar pagamento");
console.log("5- Retornar ao menu principal");

let opcao = parseInt(prompt("Selecione uma das opções"))

switch (opcao) {
    case 1:
        await procurarcliente()
        return procurar()
    case 2:
        await procurarfuncionario()
        return procurar()
    case 3:
        await procurarservico()
        return procurar()
    case 4:
        await procurarpagamento()
        return procurar()
    case 5:
        console.log("Retornando ao menu principal")
        return
    default:
        console.log("Opção inválida");
}
}

async function menu() {
    console.log ("1- Visualizar");
    console.log ("2- Procurar")
    console.log ("3- Cadastrar")
    console.log ("4- Atualizar")
    console.log ("5- Deletar")
    console.log ("6- Sair do Menu")
    let opcao = parseInt(prompt("Selecione uma das opções acima!"))
    switch(opcao){
        case 1: 
            await visualizar()
            return menu()
        case 2:
            await procurar()
            return menu()
        case 3:
            await cadastrar() 
            return menu()
        case 4: 
            await atualizar()
            return menu()
        case 5:
            await deletar()
            return menu()
        case 6:
            console.log ("Saindo do menu")
            break
        default:
            console.log ("Opção inválida!")        
            return menu()

    }   
} 

menu()
