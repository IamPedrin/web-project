import { Outlet, Link } from "react-router-dom";

function Navbar(){
    return(
        <>
            <nav className="nav">
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