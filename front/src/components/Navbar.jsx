import { Outlet, Link } from "react-router-dom";
import '../styles/Nav.css'

import { useState, useEffect} from "react";
import axios from "axios";

export default function Navbar(){

    const [validado, setValidado] = useState(false);

    const config = {
        headers: {
            "Authorization": "Bearer ".concat(sessionStorage.getItem('token'))
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

    return(
        <>
            <nav className="nav">
                <h2>Boxletter</h2>
                <ul>
                    <li><Link to="/home">Pesquisar</Link></li>
                    <li><Link to="/lista">Minha Lista</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                    <li><Link to="/" >Sair</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

//export default Navbar;