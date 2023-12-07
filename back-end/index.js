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
          return res.status(200).json({auth: true ,token: token});
        }else{
          return res.status(422).send("Senha inválida");
        }  
      }
    }
    return res.status(409).send(`Usuário ${username} não encontrado. Considere criar uma conta`);
});


app.post("/logout", function(req, res) {
  res.json({auth: false, token: null});
})

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

app.post("/cadastrar-serie", async (req, res) => {
  const { titulo, sinopse, imagem, review, nota } = req.body;

  const jsonPath = path.join(__dirname, ".", "db", "db-series.json");
  const seriesCadastradas = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));

  const id = seriesCadastradas.length + 1;

  const serieObj = new Serie(id, titulo, sinopse, imagem, review, nota);
  // Adicionar o item à lista do usuário
  seriesCadastradas.push(serieObj);

  // Salvar as alterações no arquivo JSON
  fs.writeFileSync(jsonPath, JSON.stringify(seriesCadastradas, null, 2));
  res.send("Serie cadastrado com sucesso");
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

app.get("/lista", (req, res) => {
  const jsonPath = path.join(__dirname, ".", "db", "db-series.json");
  const seriesCadastradas = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));
  return res.json(seriesCadastradas)
})

app.get("/lista/:id", (req, res) => {
  const serieId = req.params.id;
  const jsonPath = path.join(__dirname, ".", "db", "db-series.json");
  const seriesCadastradas = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));
  const serieFiltrada = seriesCadastradas.find(serie => serie.id === parseInt(serieId));
  return res.json(serieFiltrada);
})

app.delete("/lista/:id", (req, res) => {
  const jsonPath = path.join(__dirname, ".", "db", "db-series.json");
  const seriesCadastradas = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));

  const id = parseInt(req.params.id);

  const seriesFiltradas = seriesCadastradas.filter(serie => serie.id !== id);

  fs.writeFileSync(jsonPath, JSON.stringify(seriesFiltradas, null, 2));

  res.send("Série excluída com sucesso");
});

app.put("/lista/:id", (req, res) => {
  const jsonPath = path.join(__dirname, ".", "db", "db-series.json");
  const seriesCadastradas = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8", flag: "r" }));

  const id = parseInt(req.params.id);
  const seriesFiltradas = seriesCadastradas.filter(serie => serie.id !== id);
  const novasSeries = [{...req.body, id}, ...seriesFiltradas];
  fs.writeFileSync(jsonPath, JSON.stringify(novasSeries, null, 2))
  res.send("Review salva com sucesso")
});
