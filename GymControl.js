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
        let id= await procurarcliente(false)
        const checkquery= 'select id from "GymControl".clientes where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
         if (!id|| resultcheck.rows.length <= 0  ){  
            console.log("Não é possivel deletar um cliente inexistente!")
         }
         else{
        const query = 'delete  from "GymControl".clientes where id = $1'
        const result = await pool.query(query,[id])
        console.log ("Cliente deletado com sucesso!")}
    }
    catch{
        console.log("Erro ao deletar cliente!")
    }
}
async function atualizarcliente(){
    try{
        let id= await procurarcliente(false)
        const checkquery= 'select id from "GymControl".clientes where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
        if (resultcheck.rows.length <= 0 || !id){
            console.log ("Não é possivel acessar um cliente inexistente")
            return
        } 
        const colunasPermitidas = ['nome', 'email', 'numero_celular', 'plano_id']; 
        console.log ("Estas são as colunas permitidas:", colunasPermitidas)
        let coluna= prompt("O que deseja atualizar?")
        if (!colunasPermitidas.includes(coluna)) {
            console.log("Coluna inválida ou não permitida!");
            return;
        }    
        let registro = prompt ("Para o que deseja atualizar?")
        if (!coluna||!registro){
            console.log ("Não é possivel acessar ou gravar registros nulos!")
            return
        }else{
        const query = `update "GymControl".clientes set ${coluna} =$1  where id = $2`
        const result = await pool.query(query,[registro, id])
        console.log ("O cliente foi atualizado!")}
    }
    catch{
        console.log ("Erro ao atualizar o cliente")
    }
}
async function vsclientes(){
    try{
        const query = 'select clientes.nome, cpf, data_nascimento, planos.nome as plano , numero_celular, email from "GymControl".clientes join "GymControl".planos on planos.id = clientes.plano_id'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarcliente(mostrartabela = true, mensagemerro = "Cliente não encontrado!") {
    try {
        let nome = prompt("Qual o nome do cliente? ")
        if (!nome) {
            console.log("O nome não pode ser vazio!")
            return 
        }
        const checkquery = 'SELECT * FROM "GymControl".clientes WHERE nome ILIKE $1'
        const resultcheck = await pool.query(checkquery, [nome])
        if (resultcheck.rows.length > 1) {
            console.log("Múltiplos clientes com este nome detectados!")
            let cpf = prompt("Insira o CPF do cliente: ")
            if (!cpf) {
                console.log("CPF é necessário para identificar o cliente.")
                return 
            }
            const query = 'SELECT * FROM "GymControl".clientes WHERE cpf ILIKE $1'
            const result = await pool.query(query, [cpf])
            if (result.rows.length > 0) {
                if (mostrartabela) console.table(result.rows)
                return result.rows[0].id
            }
            console.log(mensagemerro)
            return 
        }
        if (resultcheck.rows.length === 1) {
            if (mostrartabela) console.table(resultcheck.rows)
            return resultcheck.rows[0].id
        }
        console.log(mensagemerro);
        return 
    } catch (error) {
        console.log("Erro ao procurar o cliente")
        return 
        
    }
}

async function cadastrarcliente(){
    try{
        let nome= prompt ("Qual o nome do cliente?")
            if (!nome){
                console.log("Não é possivel cadastrar um nome em branco!")
                return
            }
        let cpf = prompt ("Qual o CPF do cliente?")
            if (!cpf){
                console.log("Não é possivel cadastrar um CPF inexistente!")
                return
            }   
        const checkquery = 'select id from "GymControl".clientes where cpf = $1'
        const resultcheck= await pool.query(checkquery,[cpf])
        if (resultcheck.rows.length > 0 ) {
            console.log ("Não é possivel adicionar uma pessoa já existente!")
            return 
        }
        let data= prompt ("Qual a data de nascimento do cliente?")
            if (!data){
                console.log("Data precisa ser válida!")
                return
            }
        let plano= parseInt(prompt ("Qual plano o cliente escolheu?"))
        const checkquery2 = 'select id from "GymControl".planos where id = $1'
        const resultcheck2 = await pool.query(checkquery2,[plano])
            if (resultcheck2.rows.length <=0){
                console.log ("O plano é inválido!")
                return
            }
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
        let id= await procurarfuncionario(false)
        const checkquery= 'select id from "GymControl".funcionarios where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
         if (!id|| resultcheck.rows.length <=0){
            console.log ("Funcionário inexistente!")
            return
         }
        const query = 'delete  from "GymControl".funcionarios where id = $1'
        const result = await pool.query(query,[id])
        console.log("Funcionário removido com sucesso!")
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
async function procurarfuncionario(mostrartabela = true, mensagemerro = "Funcionário não encontrado!") {
    try {
        let nome = prompt("Qual o nome do funcionário?");
        if (!nome) {
            console.log("Não é possível procurar um nome vazio!")
            return 
        }
        const query = 'SELECT * FROM "GymControl".funcionarios WHERE nome ILIKE $1'
        const result = await pool.query(query, [nome])
        if (result.rows.length > 1) {
            console.log("Múltiplos funcionários com este nome detectados!")
            let cpf = prompt("Insira o CPF do funcionário para identificação:")
            if (!cpf) {
                console.log("O CPF é necessário para identificar o funcionário.")
                return 
            }
            const cpfQuery = 'SELECT * FROM "GymControl".funcionarios WHERE cpf ILIKE $1'
            const cpfResult = await pool.query(cpfQuery, [cpf])
            if (cpfResult.rows.length > 0) {
                if (mostrartabela) console.table(cpfResult.rows)
                return cpfResult.rows[0].id
            }
            console.log(mensagemerro)
            return 
        }
        if (result.rows.length === 1) {
            if (mostrartabela) console.table(result.rows)
            return result.rows[0].id
        }
        console.log(mensagemerro)
        return 
    } catch (error) {
        console.log("Erro ao procurar o funcionário")
        return 
    }
}
async function cadastrarfuncionario(){
    try{
       let nome = prompt ("Insiral o nome do funcionário")
        if (!nome){
            console.log("Nome Inválido!")
        }
       let cpf= prompt ("Insira o CPF do funcionário") 
       const checkquery = 'select id from "GymControl".funcionarios where cpf = $1'
        const resultcheck= await pool.query(checkquery,[cpf])
        if (resultcheck.rows.length > 0 ) {
            console.log ("Não é possivel adicionar uma pessoa já existente!")
            return 
        }
       let data= prompt ("Insira a data de nascimento do funcionário")
        if (!data){
            console.log("Data Inválida!")
        }
       let funcao= prompt ("Qual a função do funcionário?")
        if (!funcao){
            console.log("Função inválida!")
        }
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
        let id= await procurarfuncionario(false) 
        const checkquery= 'select id from "GymControl".funcionarios where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
            if (!id || resultcheck.rows.length <=0){
                console.log ("Funcionário inexistente!")
                return
            }
            const colunasPermitidas = ['nome', 'email', 'numero_celular', 'funcao']; 
            console.log ("Estas são as colunas permitidas:", colunasPermitidas)
            let coluna= prompt("O que deseja atualizar?") 
            if (!colunasPermitidas.includes(coluna)) {
            console.log("Coluna inválida ou não permitida!");
            return;
            }
            let registro = prompt ("Para o que deseja atualizar?")
            if (!coluna || !registro){
                console.log ("Não é possivel acessar ou gravar registros invalidos!")
            }
            else{
            const query = `update "GymControl".funcionarios set ${coluna}=$1 where id=$2`
            const result = pool.query(query,[registro, id])
            console.log ("O funcionário foi atualizado!")
            }
    }
    catch{
        console.log("Erro ao atualizar o funcionário")
    }
}
//Funções para os serviços

async function deletarservico(){
    try{
        let id= await procurarservico()
        const checkquery= 'select id from "GymControl".servicos where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
         if (!id || resultcheck.rows.length <=0){
            console.log ("Serviço inexistente!")
            return
         }
        const query = 'delete  from "GymControl".servicos where id = $1'
        const result = await pool.query(query,[id])
        console.log ("Serviço deletado com sucesso!")
    }
    catch{
        console.log("Erro ao deletar o serviço")
    }
}
async function atualizarservico() {
    try {
        let id = await procurarservico(false)
        if (!id) {
            console.log("Serviço inexistente!")
            return;
        }
        const colunasPermitidas = ['tipo_servico', 'data_servico', 'id_cliente', 'id_funcionario']
        console.log("Estas são as colunas permitidas:", colunasPermitidas)

        let coluna = prompt("O que deseja atualizar?")
        if (!colunasPermitidas.includes(coluna)) {
            console.log("Coluna inválida ou não permitida!")
            return;
        }
        let registro;
        if (coluna === 'id_cliente') {
            registro = await procurarcliente(false)
            if (!registro) {
                console.log("Cliente não encontrado!")
                return;
            }
        } else if (coluna === 'id_funcionario') {
            registro = await procurarfuncionario(false)
            if (!registro) {
                console.log("Funcionário não encontrado!")
                return;
            }
        } else {
            registro = prompt("Para o que deseja atualizar?")
            if (!registro) {
                console.log("Registro inválido!")
                return
            }
        }
        const query = `UPDATE "GymControl".servicos SET ${coluna} = $1 WHERE id = $2`
        await pool.query(query, [registro, id])
        console.log("O serviço foi atualizado com sucesso!")

    } catch (error) {
        console.error("Erro ao atualizar o serviço")
    }
}

async function vsservicos(){
    try{
        const query = 'SELECT clientes.nome AS cliente, funcionarios.nome AS funcionario, servicos.tipo_servico, servicos.data_servico FROM "GymControl".servicos JOIN "GymControl".clientes ON clientes.id = servicos.id_cliente JOIN "GymControl".funcionarios ON funcionarios.id = servicos.id_funcionario order by cliente ASC'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarservico(mostrartabela=true){
    try{
        let id= await procurarcliente(false)
            if (!id){
                console.log ("Serviço inexistente!")
                return
            }
        const query = 'select  servicos.* from "GymControl".servicos join "GymControl".clientes on servicos.id_cliente = clientes.id where clientes.id = $1 '
        const result = await pool.query(query,[id])
            if (result.rows.length <=0){
                console.log("O cliente não solicitou/realizou um serviço")
                return
            }
            if (mostrartabela){
                console.table (result.rows)
                return
            }
            if (result.rows.length > 0){
                return result.rows[0].id
            }
    }
    catch{
        console.log ("Erro ao procurar o serviço")
    }
}
async function cadastrarservico(){
    try{
        let cliente= await procurarcliente(false)
            if (!cliente){
                console.log("Não é possivel cadastrar um serviço cujo cliente é inexistente!")
                return
            }
        let funcionario = await procurarfuncionario(false)
            if (!funcionario){
                console.log("Não é possivel cadastrar um serviço cujo funcionário é inexistente!")
                return
            }
        let tipo= prompt ("Qual o tipo do serviço?")
            if (!tipo){
                console.log("O campo tipo do serviço não pode ser vazio!")
                return
            }
        let data = prompt ("Quando ocorreu o serviço?")
            if (!data){
                console.log("A data do serviço não pode ser vazia")
                return
            }
        const query = 'INSERT INTO "GymControl".servicos( "id_funcionario", id_cliente, tipo_servico, data_servico) VALUES ( $1, $2, $3, $4)'
        const result = await pool.query(query,[funcionario, cliente, tipo, data])
        console.log ("Serviço cadastrado com sucesso!")

    }catch {
        console.log ("Erro ao cadastrar serviço!")
    }
}
//Funções para os pagamentos
async function deletarpagamento(){
    try{
        let id= await procurarpagamento(false)
        const checkquery= 'select id from "GymControl".pagamentos where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
         if (!id || resultcheck.rows.length <=0){
            console.log ("Pagamento inexistente!")
            return
         }
        const query = 'delete  from "GymControl".pagamentos where id = $1'
        const result = await pool.query(query,[id])
        console.log ("Pagamento deletado com sucesso!")
    }
    catch{
        console.log("Erro ao deletar pagamento")
    }
}
async function atualizarpagamento(){
    try{
        let id= await procurarpagamento(false)
        const checkquery= 'select id from "GymControl".pagamentos where id = $1'
        const resultcheck= await pool.query(checkquery,[id])
         if (!id || resultcheck.rows.length <=0){
            console.log ("Pagamento inexistente!")
            return
         }
        const colunasPermitidas = ['forma_pagamento'];
        console.log ("Estas são as colunas permitidas:", colunasPermitidas)
        let coluna= prompt("O que deseja atualizar?")
         
        if (!colunasPermitidas.includes(coluna)) {
            console.log("Coluna inválida ou não permitida!");
            return;
        }
        let registro = prompt ("Para o que deseja atualizar?")
        if (!coluna || !registro){
            console.log ("Não é possivel acessar ou gravar registros invalidos!")
        }
        const query = `update "GymControl".pagamentos set ${coluna}=$1 where id=$2`
        const result = await pool.query(query,[registro, id])
        console.log ("O pagamento foi atualizado!")
    }
    catch{
        console.log("Erro ao atualizar o pagamento!")
    }
}
async function vspagamentos(){
    try{
        const query = 'SELECT clientes.nome AS cliente, servicos.tipo_servico AS servico, valor_total, forma_pagamento FROM "GymControl".pagamentos JOIN "GymControl".servicos ON servicos.id = pagamentos.id_servico JOIN "GymControl".clientes ON clientes.id = servicos.id_cliente;'
        const result = await pool.query(query)
        console.table(result.rows)
    }
    catch{
        console.log ("Erro")
    }
}
async function procurarpagamento(mostrartabela=true){
    try{
        let id= await procurarcliente(false)
        let query = 'select pagamentos.* from "GymControl".pagamentos join "GymControl".servicos on servicos.id = pagamentos.id_servico join "GymControl".clientes on clientes.id = servicos.id_cliente where clientes.id = $1'
        let result = await pool.query(query, [id])
            if (mostrartabela){
                 console.table (result.rows)
                 return
            }
            if (result.rows.length > 0){
                return result.rows[0].id
            }
            else{
                console.log ("Erro ao procurar o pagamento!")
            }
    }
    catch{
        console.log ("Erro ao procurar pagamento!")
    }
}
async function adicionarpagamento(){
    try{
        let servico= await procurarservico(false)
        const checkquery= 'select id from "GymControl".servicos where id = $1'
        const resultcheck= await pool.query(checkquery,[servico])
         if (!servico || resultcheck.rows.length <=0){
            console.log ("Serviço inexistente!")
            return
         }
        let valor= prompt ("Insira o valor total do(s) serviço")
         if (!valor){
            console.log ("Valor inválido!")
            return
         }
        let pagamento = prompt ("Qual a forma de pagamento?")
         if (!pagamento){
            console.log ("Forma de pagamento inválida!")
            return
         }
        const query = 'INSERT INTO "GymControl".pagamentos( id_servico, valor_total, forma_pagamento) VALUES ( $1, $2, $3)'
        const result = await pool.query(query,[servico, valor, pagamento])
        console.log ("Pagamento adicionado!!")
    }
    catch{
        console.log ("Erro ao adicionar o pagamento")
    }
}

//Funções para os agendamentos
async function vsagendamentos(){
    try{
        const query = 'select agendamentos.id, clientes.nome as cliente, funcionarios.nome as funcionario, agendamentos.data_marcada, agendamentos.tipo from "GymControl".agendamentos join "GymControl".clientes  on agendamentos.id_cliente = clientes.id join  "GymControl".funcionarios on funcionarios.id = agendamentos.id_funcionario'
        const result = await pool.query(query)
        console.table(result.rows)
    }

    catch{
        console.log("Erro ao visualizar agendamentos!")
    }
}

async function procuraragendamento(mostrartabela=true){
    try{
        let id = await procurarcliente(false)
            if (!id){
                console.log("Cliente inexistente!")
                return
            }
        const query = 'select agendamentos.id,  clientes.nome as cliente,funcionarios.nome as funcionario,  agendamentos.data_marcada, agendamentos.tipo from "GymControl".agendamentos join "GymControl".clientes  on agendamentos.id_cliente = clientes.id join  "GymControl".funcionarios on funcionarios.id = agendamentos.id_funcionario where clientes.id = $1'
        const result = await pool.query(query,[id])
            if (mostrartabela){
                console.table (result.rows)
                return 
            }
            return result.rows[0].id
    }
    catch{
        console.log ("Não foi possivel procurar o agendamento")
    }
}

async function cadastraragendamento(){
    try{
        let cliente = procurarcliente(false)
            if (!cliente){
                console.log("Cliente inexistente!")
                return
            }
        let funcionario = procurarfuncionario(false)
            if (!funcionario){
                console.log ("Funcionario inexistente!")
                return
            }
        let datamarcada= prompt ("Para que data deseja marcar?")
            if (!datamarcada){
                console.log ("Data inválida!")
                return
            }  
        let tipo= prompt("Que tipo de serviço deseja?")
            if (!tipo){
                console.log("Serviço inválido!")
                return
            }
        const query = 'INSERT INTO "GymControl".agendamentos ( id_cliente, id_funcionario,  data_marcada, tipo) VALUES ( $1, $2, $3, $4);'
        const result = await pool.query(query,[cliente, funcionario, datamarcada, tipo])
    }
    catch{
        console.log("Erro ao cadastrar agendamento")
    }
}

async function atualizaragendamento(){
    try{
        let id = await procuraragendamento(false)
            if (!id){
                console.log ("Agendamento não encontrado")
                return
            }
            const colunasPermitidas = ['data_marcada', 'tipo', 'id_cliente', 'id_funcionario']; 
            console.log("Estas são as colunas permitidas:", colunasPermitidas)
            let coluna = prompt("O que deseja atualizar?")
            if (!colunasPermitidas.includes(coluna)) {
                console.log("Coluna inválida ou não permitida!")
                return;
            }
            let registro;
            if (coluna === 'id_cliente') {
                registro = await procurarcliente(false)
                if (!registro) {
                    console.log("Cliente não encontrado!")
                    return;
                }
            } else if (coluna === 'id_funcionario') {
                registro = await procurarfuncionario(false)
                if (!registro) {
                    console.log("Funcionário não encontrado!")
                    return;
                }
            } else {
                registro = prompt("Para o que deseja atualizar?")
                if (!registro) {
                    console.log("Registro inválido!")
                    return
                }
            }
            const query = `UPDATE "GymControl".agendamentos SET ${coluna} = $1 WHERE id = $2`
            await pool.query(query, [registro, id])
            console.log("O serviço foi atualizado com sucesso!")
    }
    catch{
        console.log("Erro ao atualizar o agendamento")
    }
}

async function deletaragendamento(){
    try{
        let cliente = procurarcliente(false)
        const checkquery= 'select id from "GymControl".agendamentos where id_cliente = $1'
        const resultcheck= await pool.query(checkquery,[cliente])
            if (!id || resultcheck.rows.length <=0){
            console.log ("Agendamento inexistente!")
            return
            }
        const query = 'delete  from "GymControl".agendamento where id_cliente = $1'
        const result = await pool.query(query,[cliente])
        console.log ("Agendamento deletado com sucesso!")
        
    }
    catch{
        console.log ("Erro ao deletar o agendamento!")
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

async function procurarplano(mostrartabela=true){
    try{
        let nome= prompt("Qual o nome do plano? ")
            if (!nome){
                console.log("Deve existir um nome para procurar o plano!")   
            }
        const checkquery= 'select id from "GymControl".planos where nome = $1'
        const resultcheck= await pool.query(checkquery,[nome])
            if (resultcheck.rows.length <=0){
                console.log ("Plano inexistente!")
                return
            }    
        const query= 'SELECT * from "GymControl".planos where nome = $1'
        const result = await pool.query(query,[nome])
        if (mostrartabela){
            console.table (result.rows)
            return
        }    
        return result.rows[0].id

    }
    catch{
        console.log("Erro ao procurar o plano!")
    }
}

async function inadimplentes(){
    try{
        const query = 'SELECT clientes.nome, servicos.tipo_servico FROM "GymControl".clientes JOIN "GymControl".servicos ON clientes.id = servicos.id_cliente LEFT JOIN "GymControl".pagamentos ON servicos.id = pagamentos.id_servico WHERE pagamentos.id_servico IS NULL;'
        const result = await pool.query(query)
        console.table (result.rows)
    }
    catch{
        console.log ("Erro ao visualizar os inadimplentes")
    }
}

//Funções para os menus 
async function deletar(){
    console.log("1- Deletar cliente");
    console.log("2- Deletar funcionário");
    console.log("3- Deletar serviço");
    console.log("4- Deletar pagamento");
    console.log("5- Deletar agendamento")
    console.log("6- Retornar ao menu principal");
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
            await deletaragendamento()
            return deletar()
        case 6:
            console.log ("Retornando ao menu principal")
            return
        default:
            console.log ("Opção inválida")
            return deletar()
    }

}

async function visualizar(){
    try {
        console.log ("1- Tabela de clientes")
        console.log ("2- Tabela de funcionários")
        console.log ("3- Tabela de serviços")
        console.log ("4- Tabela de planos")
        console.log ("5- Tabela de pagamentos")
        console.log ("6- Tabela de agendamentos")
        console.log ("7- Tabela de inadimplentes")
        console.log ("8- Retornar ao menu principal")
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
                await vsagendamentos()
                return visualizar()
            case 7: 
                await inadimplentes()
                return visualizar()
            case 8: 
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
    console.log("5- Atualizar agendamentos")
    console.log("6- Retornar ao menu principal");
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
        case 5: 
            await atualizaragendamento()
            return atualizar()
        case 6:
            console.log("Retornando ao menu principal!")
            return  
        default: 
            console.log ("Opção invalida!")
            return atualizar()    
    }
}

async function cadastrar(){

    console.log("1- Cadastrar cliente");
    console.log("2- Cadastrar funcionário");
    console.log("3- Cadastrar serviço");
    console.log("4- Cadastrar pagamento");
    console.log("5- Cadastrar agendamento")
    console.log("6- Retornar ao menu principal");
    let opcao = parseInt(prompt("Selecione uma das opções"))

switch (opcao) {
    case 1:
        await cadastrarcliente()
        return cadastrar()
    case 2:     
        await cadastrarfuncionario()
        return cadastrar()
      
    case 3:
        await cadastrarservico()
        return cadastrar()
        
    case 4:
        await adicionarpagamento()
        return cadastrar()
    case 5: 
        await cadastraragendamento()
        return cadastrar()   
    
    case 6:
        console.log ("Retornando ao menu principal")
        return
        
    default:
        console.log("Opção inválida");
        return cadastrar()
}
}

async function procurar(){

console.log("1- Procurar cliente");
console.log("2- Procurar funcionário");
console.log("3- Procurar serviço");
console.log("4- Procurar pagamento");
console.log("5- Procurar agendamento")
console.log("6- Procurar planos")
console.log("7- Retornar ao menu principal");

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
        await procuraragendamento()
        return procurar()
    case 6: 
        await procurarplano()
        return procurar()
    case 7:
        console.log("Retornando ao menu principal")
        return
    default:
        console.log("Opção inválida");
        return procurar()
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
