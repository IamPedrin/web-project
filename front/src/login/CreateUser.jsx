import {set, useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export default function CreateUser() {
    
    const [msg, setMsg] = useState();
    const [userCriado, setUserCriado] = useState(false);

    const schema = yup.object({
        username: yup.string().required("Usuário obrigatório").max(15, "Máximo de 15 caracteres"),
        email: yup.string().email("Email inválido").required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória").min(6, "Mínimo de 6 caracteres"),
        passwordConfirm: yup.string().required("Confirmação de senha obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais")
    });

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState;

    const submit = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/criar", data);
            setMsg(response.data);
            if(response.data.includes("sucesso"))
                setUserCriado(true);
        } catch (error){
            setMsg(error.response.data);
        }

    };

    return(
        <>
            <h2>Crie uma nova conta</h2>
            <form onSubmit={handleSubmit(submit)} noValidate>

                <label htmlFor="username" placeholder="Usuário">Nome de Usuário</label>
                <input type="text" name="username" id="username" {...register("username")} />
                <p className="erro">{errors.username?.message}</p>
                
                <label htmlFor="email" placeholder="E-mail">E-mail</label>
                <input type="text" name="email" id="email" {...register("email")} />
                <p className="erro">{errors.email?.message}</p>

                <label htmlFor="password" placeholder="Senha">Senha</label>
                <input type="password" name="password" id="password" {...register("password")} />
                <p className="erro">{errors.password?.message}</p>

                <label htmlFor="passwordConfirm" placeholder="Senha">Confirmação de senha</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" {...register("passwordConfirm")} />
                <p className="erro">{errors.passwordConfirm?.message}</p>

                <button>CRIAR CONTA</button>
                
            </form>

            <p className="server-response">{msg}</p>
            <Link to="/"
            style={{visibility : userCriado ? 'visible' : 'hidden' }}
            >Fazer Login</Link>
        </>
    )
}