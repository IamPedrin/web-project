import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Perfil() {
 const { id } = useParams();
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [confirmarSenha, setConfirmarSenha] = useState("");

 // Função para alterar o email e senha do perfil atual
 const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/users/${id}`, {
        email,
        senha,
      });

      alert("Dados atualizados com sucesso");
    } catch (err) {
      alert("Erro ao atualizar os dados");
    }
 };

 return (
    <>
      <h2>Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirmar senha:
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Atualizar</button>
      </form>
    </>
 );
}

