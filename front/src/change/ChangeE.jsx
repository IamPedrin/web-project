import { Outlet, Link } from "react-router-dom";
import '../styles/Nav.css'


function ChangeE(){
    return(
        <>
            <nav className="nav">
                <h2>Boxletter</h2>
                <ul>
                    <li><Link to="/home">Página Inicial</Link></li>
                    <li><Link to="/lista">Minha Lista</Link></li>
                    <li><Link to="/perfil">Perfil</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar