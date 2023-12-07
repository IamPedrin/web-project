require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const fs = require("fs");
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

const User = require('./model/User');
const Serie = require('./model/Serie');


app.listen(3000, () => {
  console.log('Servidor na porta 3000');
});


app.post("/login", async (req, res) => {
    //Extração dos dados do forumlário para fazer o login
    const { username, password } = req.body;

    //Abre o BD de usuários
    const jsonPath = path.join(__dirname, ".", "db", "db-users.json");
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, {encoding: "utf-8", flag: "r"}));

    //Procura o usuário no BD
    for(let user of usuariosCadastrados){
      if(user.username === username){
        const passwordValidado = await bcrypt.compare(password, user.password);
        if(passwordValidado){
          const token = jwt.sign(user, process.env.TOKEN);
          return res.status(200).json({"token": token});
        }else{
          return res.status(422).send("Senha inválida");
        }  
      }
    }
    return res.status(409).send(`Usuário ${username} não encontrado. Considere criar uma conta`);
});


app.post("/criar", async (req, res) => {
  //Extrair dados do forms
  const { username, email, password } = req.body;

  const jsonPath = path.join(__dirname, ".", "db", "db-users.json");
  console.log(jsonPath);
  const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, {encoding: "utf-8", flag: "r"}));

  //Verificar se o usuário já existe
  for(let users of usuariosCadastrados){
    if(users.email === email){
      return res.status(409).send("Email já cadastrado");
    }
    if(users.username === username){
      return res.status(409).send("Username já cadastrado");
    }
  }
  
  //Gerar um id para o usuário
  const id = usuariosCadastrados.length + 1;

  //Criptografar a senha
  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);

  //Criacao do objeto usuário
  const user = new User(id, username, email, passwordCrypt, []);

  //Adicionar o usuário no BD
  usuariosCadastrados.push(user);
  fs.writeFileSync(jsonPath, JSON.stringify(usuariosCadastrados, null, 2));
  res.send("Usuário cadastrado com sucesso");

});

app.post("/cadastrar-review", async (req, res) => {
  const { titulo, sinopse,  nota, review } = req.body;

  const jsonPath = path.join(__dirname, ".", "db", "db-reviews.json");
  const reviewsCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));

  const id = reviewsCadastrados.length + 1;

  const reviewObj = new Serie(id, titulo, sinopse, nota, review);
  // Adicionar o item à lista do usuário
  reviewsCadastrados.push(reviewObj);

  // Salvar as alterações no arquivo JSON
  fs.writeFileSync(jsonPath, JSON.stringify(reviewsCadastrados, null, 2));
  res.send("Review cadastrado com sucesso");
});


app.get("/home", verificaToken, (req, res) => {
  const jsonPath = path.join(__dirname, ".", "db", "db-users.json");
  const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, {encoding: "utf-8", flag: "r"}));
  return res.json(usuariosCadastrados);
});

function verificaToken(req,res,next){

  const authHeaders = req.headers['authorization'];
  
  const token = authHeaders && authHeaders.split(' ')[1]
  //Bearer token

  if(token == null) return res.status(401).send('Acesso Negado');

  jwt.verify(token, process.env.TOKEN, (err) => {
      if(err) return res.status(403).send('Token Inválido/Expirado');
      next();
  })

}

app.get("/perfil", verificaToken, (req, res)=>{

  //Abre o bd com os usuários e retorna o nome do usuário logado atualmente 
  const jsonPath = path.join(__dirname,'.','db','db-users.json');
  const username = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}));

  return res.json(username);
});