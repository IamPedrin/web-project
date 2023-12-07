import React, { useState } from 'react';
import {set, useForm} from 'react-hook-form';
import axios from 'axios';
import "./ShowSearch.css"

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const ShowDetails = ({ show, onClose }) => {

  const [msg, setMsg] = useState("");
  const [review, setReview] = useState(false);

  
  const schema = yup.object({
    nota: yup.number().required(),
    review: yup.string().required()
  });

  const form = useForm({
    resolver: yupResolver(schema)
  });


  const {register, handleSubmit, formState} = form;

  const {errors} = formState;

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/cadastrar-review', data);
      setMsg(response.data);
      if(response.data.includes('sucesso'))
          setReview(true);
    } catch (error) {
      setMsg(error.response.data);
    } 
  }

  return (
    <>
    <div className='overlay'>
      <form className='modal' onSubmit={handleSubmit(submit)} noValidate>
        <button onClick={onClose}>Fechar</button>
        <h2 htmlFor="titulo" id="titulo" {...register("titulo")}>{show.name}</h2>
        <p htmlFor="sinopse" id="sinopse" {...register("sinopse")}>{show.summary}</p>
        <label htmlFor='nota'>Nota:</label>
        <input type="number" id="nota" {...register("nota")}/>
        <p className="erro">{errors.nota?.message}</p>
        <label htmlFor='review'>Review:</label>
        <input type='text' id='review' {...register("review")}/>
        <p className="erro">{errors.review?.message}</p>
        <button>Avaliar</button>
      </form>
    </div>
    </>
    
  );
};

const ShowSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const searchShows = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao procurar séries:', error);
    }
  };

  const showDetails = (show) => {
    setSelectedShow(show);
  };

  const closeDetails = () => {
    setSelectedShow(null);
  };

  return (
    <div>
      <h1>Pesquisa de Séries</h1>
      <input type="text" placeholder="Procurar séries" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={searchShows}>Pesquisa</button>
      {results.map((result) => (
        <div key={result.show.id}>
          <button className='buttonSerie' onClick={() => showDetails(result.show)}>
            {result.show.image && <img src={result.show.image.medium} alt={result.show.name} />}
            <p>{result.show.name}</p>
          </button>
        </div>
      ))}
      {selectedShow && <ShowDetails show={selectedShow} onClose={closeDetails} />}
    </div>
  );
};

export default ShowSearch;