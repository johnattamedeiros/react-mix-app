import React from 'react';
import { useEffect, useState } from 'react';
import './../styles/home.css'

const Home = () => {
  const [gcId, setGcId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gcId) {
      alert('Por favor, insira o Gamersclub ID');
      return;
    }

    const data = {
      id_gc: gcId
    };

    console.log('Enviando JSON:', data);

    setGcId('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGcId(value);
    }
  };
  return (
    <div className="home-container">
      <div className="logo-container">
      <h1>mixdurasso</h1>
      <a href="/" class="MainHeader__logo">
      <img src="https://static.gamersclub.com.br/assets/header/gamersclub-hrz-w.svg" alt="Gamers Club" className="logo"></img></a>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          <p>Adicione seu id da gamersclub: </p>
          <input
            type="text"
            value={gcId}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  );
};

export default Home;
