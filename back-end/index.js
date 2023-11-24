const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor na porta 3000');
});


app.post("/login", (req, res) => {
    //Extração dos dados do forumlário para fazer o login
    const { email, password } = req.body;
});

