//import { openDb } from "./configDB.js";
import { createTable, insertPessoa, updatePessoa, selectPessoa, selectPessoas, deletePessoa } from './Controller/Pessoa.js';

console.log("Ok");
import express from 'express';
const app = express();
app.use (express.json());

//openDb();
createTable();

app.get('/' , function(req, res){
    res.send("Olá Mundo!")
    })

app.get('/pessoas' , async function(req, res){
    let pessoas = await selectPessoas();
    res.json(pessoas);
    });

app.get('/pessoa' , async function(req, res){
    let pessoa = await selectPessoa(req.body.id);
    res.json(pessoa);
    });

app.post('/pessoa', function(req, res){
    insertPessoa(req.body)
    res.json({
    "statusCode": 200
    })
});

    
app.put('/pessoa', function(req, res){
    if (req.body && !req.body.id){
        res.json({
            "statusCode" : "400",
            "msg": "você precisa informar o id."
        })
    } else {
        updatePessoa(req.body)
        res.json({
            "statusCode": 200
        })
    }
       
});

app.delete('/pessoa' , async function(req, res){
    let pessoa = await deletePessoa(req.body.id);
    res.json(pessoa);
});


app.listen(3000, () => console.log("Api Rodando."))
console.log("Ok até aqui.")