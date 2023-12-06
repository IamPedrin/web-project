const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

const User = require('./model/User');

app.use(express.json());

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
          return res.json({"token": token});
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
  const user = new User(id, username, email, passwordCrypt);

  //Adicionar o usuário no BD
  usuariosCadastrados.push(user);
  fs.writeFileSync(jsonPath, JSON.stringify(usuariosCadastrados, null, 2));
  res.send("Usuário cadastrado com sucesso");

});

app.get("/home", verificaToken, (req, res) => {
  const jsonPath = path.join(__dirname, ".", "db", "db-users.json");
  const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, {encoding: "utf-8", flag: "r"}));

  return res.json(usuariosCadastrados);
});


function verificaToken(req, res, next){
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  //bearer token

  if(token == null) return res.status(401).send("Acesso Negado/Expirado");

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if(err) return res.status(403).send("Token inválido");
    req.user = user;
    next();
  });
}

app.get("/perfil", verificaToken, (req, res)=>{

  //Abre o bd com os usuários e retorna o nome do usuário logado atualmente 
  const jsonPath = path.join(__dirname,'.','db','db-users.json');
  const username = JSON.parse(fs.readFileSync(jsonPath, {encoding: 'utf8', flag: 'r'}));

  return res.json(username);
});