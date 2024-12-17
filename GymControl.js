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

async function visualizar(){
    try {
        console.log ("1- Tabela de clientes")
        console.log ("2- Tabela de funcionários")
        console.log ("3- Tabela de serviços")
        console.log ("4- Tabela de planos")
        console.log ("5- Tabela de pagamentos")
        let opcao= parseInt(prompt("Selecione a tabela que deseja acessar!"))
        switch (opcao){
            case 1:
        }
    }
    catch{
        console.log ("Não foi possivel visualizar as tabelas!")
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
    console.log("1-");
    console.log("2-");
    console.log("3-");
    console.log("4-");
    console.log("5-");
    console.log("6-");
    console.log("7-");
    console.log("8-");
    console.log("9-");
    console.log("10-");
    let opcao = parseInt(prompt("Selecione uma das opções acima!"))

}
