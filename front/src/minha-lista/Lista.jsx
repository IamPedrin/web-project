import React, { useState } from 'react';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';

export default function Lista({ lista }) {
    const [deleted, setDeleted] = useState(false);

    async function handleDeletar() {
        try {
            await axios.delete(`http://localhost:3000/lista/${lista.id}`);
            setDeleted(true);
        } catch (err) {
            console.log(err);
        }
    }

    if (deleted) {
        return null; // ou qualquer outra ação que você queira tomar após a exclusão
    }

    return (
        <div>
            <figure>
                <img src={`${lista.imagem}`} alt="img-db" />
            </figure>
            <button onClick={handleDeletar}>Deletar</button>
            <button>Editar</button>
            <button>Sobre</button>
        </div>
    );
}
