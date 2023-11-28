import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//Importando Rotas
import Login from "./login/Login.jsx";
import CreateUser from "./login/CreateUser.jsx";
import Home from "./home/Home.jsx";

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
    element: <Home />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
