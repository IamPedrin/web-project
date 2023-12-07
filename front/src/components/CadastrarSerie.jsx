import {set, useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const CadastrarSerie = () => {

    const [valor, setValor] = useState("");
    const [msg, setMsg] = useState();
    const [serieCriado, setSerieCriado] = useState(false);

    const schema = yup.object({
        titulo: yup.string().required(),
        sinopse: yup.string().required(),
        imagem: yup.string().required().url(),
        nota: yup.number().required(),
        review: yup.string().required()

    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState;

    const submit = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/cadastrar-serie", data);
            setMsg(response.data);
            if(response.data.includes("sucesso"))
                setSerieCriado(true);
        } catch (error){
            setMsg(error.response.data);
        }
    }

    return(
        <>
            <h1>Cadastre aqui sua série</h1>
            <form onSubmit={handleSubmit(submit)} noValidate>
    
                <label htmlFor="titulo" placeholder="Título">Titulo</label>
                <input  type="text" name="titulo" id="titulo" {...register("titulo")} />
                <p className="erro">{errors.titulo?.message}</p>
                <label htmlFor="sinopse" placeholder="Sinopse">Sinopse</label>
                <input  type="text" name="sinopse" id="sinopse" {...register("sinopse")} />
                <p className="erro">{errors.sinopse?.message}</p>
                <label htmlFor="imagem" placeholder="Imagem">Imagem</label>
                <input  type="text" name="imagem" id="imagem" {...register("imagem")} />
                <p className="erro">{errors.imagem?.message}</p>
                <label htmlFor="nota" placeholder="Nota">Nota</label>
                <input  type="number" name="nota" id="nota" max={5} min={1} {...register("nota")} />
                <p className="erro">{errors.nota?.message}</p>
                <label htmlFor="review" placeholder="Review">Review</label>
                <input  type="text" name="review" id="review" {...register("review")} />
                <p className="erro">{errors.review?.message}</p>
                <button>Cadastrar</button>
            </form>
            <p className="erro">{msg}</p>
            
        </>
    )

};



export default CadastrarSerie;