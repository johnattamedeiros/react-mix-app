import React from 'react';
import { useEffect, useState } from 'react';
import ApiService from './../api/apiService';
import './../styles/styles.css'

const Home = () => {
  const [gcId, setGcId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gcId) {
      alert('Por favor, insira o Gamersclub ID');
      return;
    }

    const data = {
      id_gc: gcId
    };

    try {
      const response = await ApiService.enviarGcId(gcId);
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
    <div className="player-card">
    <img src="https://static.gamersclub.com.br/assets/header/gamersclub-hrz-w.svg" alt="Gamers Club" ></img>


    <div className="player-info">
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          <p>Digite seu id da Gamersclub :</p>
          <input
            type="text"
            value={gcId}
            onChange={handleChange}
            className="input-field"
          />
        </label><br></br><br></br>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  </div>
  );
};

export default Home;
