import React, { useState } from 'react';
import axios from 'axios';
import "./ShowSearch.css"

const ShowDetails = ({ show, onClose }) => {
  const [note, setNote] = useState('');
  const [review, setReview] = useState('');

  return (
    <div className='overlay'>
      <div className='modal'>
        <button onClick={onClose}>Fechar</button>
        <h2>{show.name}</h2>
        <p>{show.genre}</p>
        <p>{show.year}</p>
        <p>{show.summary}</p>
        <label>Nota:</label>
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
        <label>Review:</label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        {/* Adicione aqui o botão para enviar a nota e a review para o servidor */}
      </div>
    </div>
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
      <div className='searchBar'>
        <h2>Pesquisa de Séries</h2>
        <input type="text" placeholder="Procurar séries" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={searchShows}>Pesquisa</button>
      </div>

      <div className='seriesExhibit'>
        {results.map((result) => (
          <div key={result.show.id}>
            <button className='buttonSerie' onClick={() => showDetails(result.show)}>
              {result.show.image && <img src={result.show.image.medium} alt={result.show.name} />}
              <p>{result.show.name}</p>
            </button>
          </div>
      ))}
      </div>
      {selectedShow && <ShowDetails show={selectedShow} onClose={closeDetails} />}
    </div>
  );
};

export default ShowSearch;