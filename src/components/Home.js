import React from 'react';
import { useEffect, useState } from 'react';
import ApiService from './../api/apiService';
import './../styles/styles.css'

const Home = () => {
  const [id, setGcId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert('Por favor, insira o Gamersclub ID');
      return;
    }

    const data = {
      id: id
    };

    try {
      const response = await ApiService.enviarGcId(id);
      alert('Gamersclub ID enviado com sucesso!');
    } catch (error) {
      alert('Ocorreu um erro ao enviar o Gamersclub ID. Tente novamente mais tarde.' + error);
    }

    setGcId('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGcId(value);
    }
  };
  return (
    <div class="form-container">
    <img src="https://static.gamersclub.com.br/assets/header/gamersclub-hrz-w.svg" alt="Gamers Club" ></img><br></br><br></br>


      <form onSubmit={handleSubmit} className="form-container">
      
          <input
            type="text"
            value={id}
            onChange={handleChange}
            className="input-field"
            placeholder="Digite seu ID da Gamersclub"
          />
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Home;
