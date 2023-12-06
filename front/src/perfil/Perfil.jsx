import {set, useForm} from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {Link} from "react-router-dom";

import User from "./User";
import "../styles/Perfil.css"


export default function Perfil(){

    return(
        <>
            <h2>Meu perfil</h2>
            <body className="profileExhibit">
                <h2 className="headerNome">Bem-vindo, (nome)</h2>
                <div className="buttonBox">
                    <Link to="/mudar-senha"><button>Trocar de Senha</button></Link>
                    <Link to="/ChangeE"><button>Trocar de Email</button></Link>
                    <Link to="/"><button>Deslogar</button></Link>
                </div>
            </body>

        </>
    )
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
