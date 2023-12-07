import { Outlet, Link } from "react-router-dom";
import '../styles/Nav.css'

import { useState, useEffect} from "react";
import axios from "axios";

export default function Navbar(){

    const [validado, setValidado] = useState(false);

    const config = {
        headers: {
            "Authorization": "Bearer ".concat(localStorage.getItem('token'))
        }
    }

    useEffect(() => {
        async function valida(){
            try{
                const resposta = await axios.get(`http://localhost:3000/home`,config);
                console.log(resposta);
                if(resposta.status === 200)
                    setValidado(true);
            }catch(error){
                setValidado(false);
            }
        }
        valida();
    }, []);

    if(!validado){
        return <p>Token Inválido</p>
    }

    async function logout(){
        const response = await axios.post("http://localhost:3000/logout");
        if(response.status === 200)
            setValidado(false);
    }

    return(
        <>
            <nav className="nav">
                <h2>Boxletter</h2>
                <ul>
                    // <li><Link to="/home" className="navbarButtons">Cadastrar</Link></li>
                    // <li><Link to="/lista" className="navbarButtons">Minha Lista</Link></li>
                    // <li><Link to="/perfil" className="navbarButtons">Perfil</Link></li>
                    // <li><Link to="/" className="navbarButtons">Sair</Link></li>
                    <li><Link to="/lista">Lista</Link></li>
                    <li><Link to="/home">Cadastrar Série</Link></li>
                    <li><Link to="/" onClick={logout} >Sair</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}