import React, { useState } from 'react';
import ApiService from '../api/apiService';
import './../styles/styles.css';
import './../styles/Modal.css';

const AddAccount = () => {
  const [id, setGcId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert('Por favor, insira o Gamersclub ID');
      return;
    }

    const data = {
      id: id,
    };

    try {
      const response = await ApiService.enviarGcId(id);
      alert('Gamersclub ID enviado com sucesso!');
    } catch (error) {
      alert(
        'Ocorreu um erro ao enviar o Gamersclub ID. Tente novamente mais tarde.' +
        error
      );
    }

    setGcId('');
    setIsModalOpen(false); // Fecha o modal após o envio
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGcId(value);
    }
  };

  return (
    <div className='add-account'>
      <div className='add-account-button'>

        <button className="open-modal-button submit-button" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src="https://static.gamersclub.com.br/assets/header/gamersclub-hrz-w.svg"
              alt="Gamers Club"
              className="modal-image"
            />
            <h3>
              Adicionar conta
            </h3>

            <form onSubmit={handleSubmit} className="form-container">
              <input
                type="text"
                value={id}
                onChange={handleChange}
                className="input-field"
                placeholder="Digite seu ID da Gamersclub"
              />
              <button type="submit" className="submit-button">
                Enviar
              </button>
            </form>
            <button
              className="close-modal-button"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAccount;
