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


async function procurarservico(){
    try{
        let nome= procurarcliente()
        const query = 'select  servicos.* from "GymControl".servicos join "GymControl".clientes on servicos.id_cliente = clientes.id where clientes.nome = $1'
        const result = await pool.query(query,[nome])
        console.log (result.rows)
        return result.rows[0].id
    }
    catch{
        console.log ("Erro ao procurar o serviço")
    }
}

async function procurarpagamento(){
    try{
        let id= procurarcliente()
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
        let servico= procurarservico()
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

async function cadastrarservico(){
    try{
        let cliente= procurarcliente()
        let funcionario = procurarfuncionario()
        let tipo= prompt ("Qual o tipo do serviço?")
        let data = prompt ("Quando ocorreu o serviço?")
        let valor = parseInt(prompt ("Qual o valor do serviço"))
        const query = 'INSERT INTO "GymControl".servicos( "id_funcionário", id_cliente, tipo_servico, data_servico, valor) VALUES ( $1, $2, $3, $4, $5)'
        const result = await pool.query(query,[cliente, funcionario, tipo, data, valor])

    }catch {
        console.log ("Erro ao cadastrar serviço!")
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

async function menu() {
    console.log ("1- Visualizar");
    console.log ("2- Procurar")
    console.log ("3- Cadastrar")
    console.log ("4- Atualizar")
    console.log ("5- Deletar")
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
            await
            return menu()
        case 5:
            await 
            return menu()
        case 6:
            await 
            return menu()
        case 7: 
            await 
            return menu()
        case 8: 
            await 
            return menu()
        case 9:
            await
            return menu()
        case 10:
            console.log ("Saindo do menu")
            break
        default:
            console.log ("Opção inválida!")        
            return menu()

    }   
} menu()
