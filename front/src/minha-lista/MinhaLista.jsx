import { useEffect, useState } from "react";
import Lista from "./Lista";
import axios from 'axios';
import { useForm } from "react-hook-form";


// export default function MinhaLista(){
    
//     //const [validado, setValidado] = useState(false);
    

//     const form = useForm();
//     const {register, handleSubmit} = form;

//     // const submit = (data) => {
//     //     setFormData({...formData, ...data});
//     // }
    
//     // const config = {
//     //     headers:{
//     //         'Authorization' : 'Bearer '.concat(sessionStorage.getItem('token'))
//     //     }
//     // }
    
//     // useEffect(() => {

//     //     async function valida(){
//     //         try{
//     //             const resposta = await axios.get(`http://localhost:3000/lista`,config);
//     //             console.log(resposta);
//     //             if(resposta.status === 200)
//     //                 setValidado(true);
//     //         }catch(error){
//     //             setValidado(false);
//     //         }
//     //     }
//     //     valida();
//     // }, []);

//     // if(!validado){
//     //     return <p>Token Inválido</p>
//     // }

//     return(
//         <>
//             <h2>Aqui você encontra uma lista gigante de séries</h2>
//             <BuscaSerie formData={formData}/>
//         </>
//     )
// }

export default function MinhaLista(){
    const [formData, setFormData] = useState({titulo : " "});
    const [msg, setMsg] = useState("");
    const [series, setSeries] = useState(<p>Esperando sua pesquisa!! :) </p>);

    const view = [];

    useEffect(() => {
        
        const submit = async () => {
            let endPoint = "http://localhost:3000/lista";
            endPoint = `${endPoint}/${formData.titulo}`
            try{
                const dados = await axios.get(`${endPoint}`);
                if(Array.isArray(dados.data)){
                    for(let lista of dados.data){
                        view.push(<Lista lista={lista}/>)
                    }
                }else{
                    view.push(<Lista lista={dados.data}/>);
                }
                setSeries(view);
                setMsg('');
            }catch (error){
                setMsg(error.response.data);
                setSeries(<p></p>);
            }
        }
        submit();
    }, [formData]);

    return(
        <>
            {series}
            {msg}
        </>
    )

}