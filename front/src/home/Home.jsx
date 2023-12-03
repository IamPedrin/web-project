import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Home({}) {

    const [validado, setValidado] = useState(false);
    const [msg, setMsg] = useState();
    const [serieCadastro, setSerieCadastro] = useState(false);
    const [valor, setValor] = React.useState('');

    // const schema = yup.object({
    //     titulo: yup.string().required("Titulo Obrigatória"),
    //     ano: yup.number().required("Ano Obrigatório").positive("Apenas números positivos").integer("Apenas números inteiros"),
    //     genero: yup.string().required("Gênero Obrigatório"),
    //     sinopse: yup.string().required("Sinopse Obrigatória"),
    //     imagem: yup.string().required("Imagem Obrigatória")
    // });

    const form = useForm();
    // form = yup.object({
    //     resolver: yupResolver(schema)
    // });

    const {register, handleSubmit, formState} = form;
    const {errors} = formState || {};

    // const config = {
    //     headers:{
    //         'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
    //     }
    // }
   

    // useEffect(() => {
    //     async function valida() {
    //         try {
    //             const response = await axios.get('http://localhost:3000/home', config);
    //             console.log(response);
    //             if(response.status === 200) setValidado(true);
    //         }catch(error){
    //             setValidado(false);
    //         }
    //     }


    //     valida();
    //     if(!validado){
    //         return <p>Token Inválido</p>
    //     }
    // }, []);

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/home', data);
            setMsg(response.data);
            if (response.data.includes('sucesso')) {
                setSerieCadastro(true);
            }
        } catch (error) {
            setMsg(error.response.data);
        }
    };
    


    // const submit = async (data) => {
    //     try {
    //         const response = await axios.post("http://localhost:3000/home", data);
    //         setMsg(response.data);
    //         if (response.data.includes("sucesso")) {
    //             setSerieCadastro(true);
    //         }
    //     } catch (error) {
    //         setMsg(error.response.data);
    //     }
    // };

    

    // useEffect(() => {

    //     async function valida(){
    //         try{
    //             const resposta = await axios.get(`http://localhost:3000/home`,config);
    //             console.log(resposta);
    //             if(resposta.status === 200)
    //                 setValidado(true);
    //         }catch(error){
    //             setValidado(false);
    //         }
    //     }
    //     valida();
    // }, []);
    




    return(
        <>
            <h2>Home</h2>
            <form onSubmit={handleSubmit(submit)} noValidadte>
                <label htmlFor="titulo">Titulo</label>
                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" id="titulo" {...register("titulo")}/>
                <p className="erro">{errors.titulo?.message}</p>

                <label htmlFor="ano">Ano</label>
                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" id="ano" {...register("ano")}/>
                <p className="erro">{errors.ano?.message}</p>

                <label htmlFor="genero">Gênero</label>
                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" id="genero" {...register("genero")}/>
                <p className="erro">{errors.genero?.message}</p>

                <label htmlFor="sinopse">Sinopse</label>
                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" id="sinopse" {...register("sinopse")}/>
                <p className="erro">{errors.sinopse?.message}</p>

                <label htmlFor="imagem">Imagem</label>
                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" id="imagem" {...register("imagem")}/>
                <p className="erro">{errors.imagem?.message}</p>

                <button  onClick={() => setValor('')}>Cadastrar</button>
            </form>

            <p className='server-response'>{msg}</p>
            <Link to="/minha-lista"
            style={{visibility : serieCadastro ? 'visible' : 'hidden' }}
            >Lista</Link>
        </>
    )
}