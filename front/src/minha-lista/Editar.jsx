import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Editar = () => {


    const [error, setError] = useState(false);

    const { id } = useParams(); 

    const [serie, setSerie] = useState({
        id: id,
        titulo: "",
        sinopse: "",
        imagem: "",
        nota: null,
        review: ""
    });

    const location = useLocation();
    const navigate = useNavigate();

    //const id = location.pathname.split("/")[3];

    const hanldeEditar = (e) => {
        setSerie((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/lista/${id}`, serie);
            navigate("/lista");
        }catch(err) {
            console.log(err);
            setError(true);
        }
    };

    return(
        <div>
            <h2>Atualize o review de sua série!</h2>
            <input type="text" id="titulo" name="titulo" placeholder="Título" onChange={hanldeEditar}/>
            <input type="text" id="sinopse" name="sinopse" placeholder="Sinopse" onChange={hanldeEditar}/>
            <input type="text" id="imagem" name="imagem" placeholder="Imagem URL" onChange={hanldeEditar}/>
            <input max={5} min={1} type="number" name="nota" id="nota" placeholder="Nota" onChange={hanldeEditar}/>
            <textarea type="text" id="review" name="review" placeholder="Review" onChange={hanldeEditar}/>
            <button onClick={handleClick}>Atualizar</button>
            {error && <p>Erro ao atualizar</p>}
            <Link to="/lista">Voltar para a lista</Link>
        </div>
    )
}

export default Editar;