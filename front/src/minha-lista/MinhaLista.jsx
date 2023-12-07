import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Lista.css";

const MinhaLista = () => {
    const [series, setSeries] = useState([]);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/lista/${id}`);
          window.location.reload();
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
    };

    const [validado, setValidado] = useState(false);

    const config = {
        headers: {
            "Authorization": "Bearer ".concat(sessionStorage.getItem('token'))
        }
    }

    useEffect(() => {
        const sincronizaSeries = async () => {
            try {
                const res = await axios.get("http://localhost:3000/lista");
                setSeries(res.data);
            }catch (err){
                console.log(err);
            }
        };
        sincronizaSeries();
    }, []);


    return(
        <div>
            <h2>Lista de Series</h2>
            <div className="lista">
                {series.map((serie) => (
                    <div className="serie">
                        <figure>
                            <img src={`${serie.imagem}`} alt="img-db" />
                        </figure>
                        <button onClick={() => handleDelete(serie.id)} className="listaButtons">Deletar</button>
                        <button className="listaButtons">
                            <Link to={`/lista/editar/${serie.id}`} className="listaButtons">
                            Editar
                            </Link>
                        </button>
                        <button className="listaButtons">
                            <Link to={`/lista/sobre/${serie.id}`} className="listaButtons">
                                Sobre
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MinhaLista;