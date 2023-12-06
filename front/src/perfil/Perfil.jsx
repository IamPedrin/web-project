import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Perfil.css"

export default function Perfil() {
 const { id } = useParams();
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [confirmarSenha, setConfirmarSenha] = useState("");

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



    // return(
    //     <>
    //         <h2>Meu perfil</h2>
    //         <body className="profileExhibit">
    //             <h2 className="headerNome">Bem-vindo, (nome)</h2>
    //             <div className="buttonBox">
    //                 <Link to="/mudar-senha"><button>Trocar de Senha</button></Link>
    //                 <Link to="/ChangeE"><button>Trocar de Email</button></Link>
    //                 <Link to="/"><button>Deslogar</button></Link>
    //             </div>
    //         </body>

    //     </>
    // )


}

// Perfil.jsx
// import React from 'react';
// import { useUser } from '../UserContext'; // Ajuste o caminho conforme necessário
// import { useNavigate } from 'react-router-dom';

// const Perfil = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   // Verifica se o usuário está autenticado
//   if (!user) {
//     // Se não estiver autenticado, redirecione para a página de login
//     navigate('/');
//     return null;
//   }

//   return (
//     <>
//       <h2>Meu perfil</h2>
//       <body className="profileExhibit">
//         <h2 className="headerNome">Bem-vindo, {user.username}</h2>
//         <div className="buttonBox">
//           <button>Trocar de Senha</button>
//           <button>Trocar de Email</button>
//         </div>
//       </body>
//     </>
//   );
// };

// export default Perfil;
 // Função para alterar o email e senha do perfil atual


