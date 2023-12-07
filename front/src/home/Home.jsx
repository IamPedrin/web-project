import { useEffect, useState } from "react"
import axios from "axios";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import "../styles/Home.css"

export default function Home(){

    const [msg, setMsg] = useState(" ");
    const [serieCriado, setSerieCriado] = useState(false);

    const schema = yup.object({
        titulo: yup.string().required("Titulo obrigatório"),
        sinopse: yup.string().required("Sinopse obrigatória").max(100, "Máximo de 100 caracteres"),
        ano: yup.number().required("Ano obrigatório"),
        genero: yup.string().required("Genero obrigatório"),
        imagem: yup.string().required("Imagem obrigatória")
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState || {};

    const submit = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/home", data);
            setMsg(response.data);
            if(response.data.includes("sucesso"))
                setSerieCriado(true);
        } catch (error){
            setMsg(error.response.data);
        }

    }
    

    return(
        <>
            <h2>Cadastre aqui sua série</h2>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <label htmlFor="titulo">Titulo</label>
                <input type="text" id="titulo" {...register("titulo")} />
                <p className="erro">{errors.titulo?.message}</p>

                <label htmlFor="sinopse">Sinopse</label>
                <input type="text" id="sinopse" {...register("sinopse")} />
                <p className="erro">{errors.sinopse?.message}</p>

                <label htmlFor="ano">Ano</label>
                <input type="text" id="ano" {...register("ano")} />
                <p className="erro">{errors.ano?.message}</p>

                <label htmlFor="genero">Genero</label>
                <input type="text" id="genero" {...register("genero")} />
                <p className="erro">{errors.genero?.message}</p>

                <label htmlFor="imagem">Imagem</label>
                <input type="text" id="imagem" {...register("imagem")} />
                <p className="erro">{errors.imagem?.message}</p>

                <button>Cadastrar</button>
            </form>
        </>
    )
}