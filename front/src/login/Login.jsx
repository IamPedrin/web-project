import {useForm} from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login(){

    const schema = yup.object({
        username: yup.string().required("Username Obrigatório").max(15, "Máximo de 15 caracteres"),
        password: yup.string().required("Senha Obrigatória").min(6, "Mínimo de 6 caracteres")
    });

    const [msg, setMsg] = useState(" ");

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const submit = async (data) => {
        
        try
        {
            const response = await axios.post("http://localhost:3000/login", data);
            const token = response.data.token;
            sessionStorage.setItem("token", token);
            if(token)
                setMsg("Autenticado");
        }
        catch(error)
        {
            setMsg(error.response.data);
        }

    }

    if(msg.toLowerCase().includes("autenticado")){
        return <Navigate to="/home" />
    }

    return(
        <>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit(submit)} noValidate>

                <label htmlFor="username" placeholder="Usuário">Usuário</label>
                <input type="text" id="username" {...register("username")} />
                <p className="erro">{errors.email?.message}</p>

                <label htmlFor="password" placeholder="Senha">Senha</label>
                <input type="password" id="password" {...register("password")}/>
                <p className="erro">{errors.password?.message}</p>

                <button>LOGIN</button>

            </form>

            <p className="server-response">{msg}</p>
            <div className="realizar-cadastro">
                Não possui cadastro? <Link to="/criar-user">Clique aqui</Link>
            </div>
        </>
    );
}