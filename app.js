const express = require('express')
const app = express()
const https = require("https")
const fs = require("fs")
const port = process.env.PORT

// caso eu precise: http://localhost/Learning/read

app.get('/', (req, res) => {
    var conteudo = '';
    var usuario = "takenet";
    var recebeObjetos = []
    var parametro = []

    //Argumentos para setar o Agente
    var options = {
        host: 'api.github.com',
        path: '/orgs/'+usuario+'/repos?page=1',
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    }

    //Fazendo a requisição
    const request = https.request(options, response => {
        response.on('data', dados => {
            conteudo += dados; //Capturando os dados retornados da requisição
        })
        response.on('end', () => {
            var objetos = JSON.parse(conteudo) //Passando para JSON os dados retornados pela requisição
            //Passando o laço for para acessar os atributos de cada índice do JSON
            for (var i = 0; i < objetos.length; i++) {
                //Verificando se a linguagem do índice é C#
                if (objetos[i]["language"] == "C#") {
                    //Armazenando os dados do índice no meu objeto recebeObjetos, caso a condição seja satisfeita
                    recebeObjetos.push(objetos[i])
                }
            }
            //Passando laço for para pegar apenas os 5 necessários
            for (var i = 0; i < 5; i++) {
                parametro[i] = recebeObjetos[i];
            }
            //Passando para string os dados recebidos no meu objeto parametro
            var json = JSON.stringify(parametro)
            //Enviando para página como JSON para ser consumido
            res.send(JSON.parse(json))
        })
    })
    //Verifica se a requisição possui algum erro
    request.on('error', erro => {
        console.error(erro)
    })
    request.end() //Finaliza a requisição
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost/');
})