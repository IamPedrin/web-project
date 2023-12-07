import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//Importando Rotas
import Login from "./login/Login.jsx";
import CreateUser from "./login/CreateUser.jsx";
import Navbar from './components/Navbar.jsx';
import Perfil from './perfil/Perfil.jsx';
import MinhaLista from './minha-lista/MinhaLista.jsx';
import ChangeP from "./change/ChangeP.jsx";
import ShowSearch from './components/ShowSearch.jsx'
import CadastrarSerie from './components/CadastrarSerie.jsx'

//Adicionando Rotas
const router = createBrowserRouter([
  {
    path: '/', //Página inicial - LOGIN
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: "/criar-user",
        element: <CreateUser />
      }
    ]
  },
  {
    path: "/home",
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <CadastrarSerie />
      }
    ]
  },
  {
    path: "/perfil",
    element: <Navbar />,
    children: [
      {
        path: "/perfil",
        element: <Perfil />
      },
      {
        path: "/perfil/:username",
        element: <Perfil />
      }
    ]
  },
  {
    path: "/lista",
    element: <Navbar />,
    children: [
      {
        path: "/lista",
        element: <MinhaLista />
      },
      {
        path: "/lista/:id",
        element: <MinhaLista />
      }
    ]
  },
  {
    path: '/mudar-senha',
    element:<Navbar/>,
    children:[
      {
        path: '/mudar-senha',
        element:<ChangeP />
      }
    ]
    
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)