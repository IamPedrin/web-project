import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import "../styles/Sobre.css"


const Sobre = () => {   

     const [serie, setSerie] = useState({})

    const [error, setError] = useState(false);

    const { id } = useParams(); 

    useEffect(() => {
        axios.get(`http://localhost:3000/lista/${id}`)
            .then(response => {
                setSerie(response.data);
            })
            .catch(error => {
                setError(true);
            });
    }, [id]);

    return (
        <div>
            <h2>Sobre a Série</h2>
            <div className="serieAbout">
                <figure>
                    <img src={serie.imagem} alt="img-db" />
                </figure>
                <div className="">
                    <h2>{serie.titulo}</h2>
                    <p>{serie.sinopse}</p>
                    <p>Nota: {serie.nota}</p>
                    <p>Review: {serie.review}</p>
                </div>
                
            </div>
            <Link to="/lista">Voltar para a lista</Link>
        </div>
    )
}

export default Sobre;