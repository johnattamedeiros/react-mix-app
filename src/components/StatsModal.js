import React, { useState, useEffect } from "react";
import {
  fetchHighestStats,
  fetchLowestStats,
  fetchRatingDiff,
  updatePlayers,
  updateMatches,
  updateMatchesData
} from "../api/statService";
import './../styles/StatsModal.css';
import './../styles/gc.css';

const StatsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("highest");
  const [highestStats, setHighestStats] = useState([]);
  const [lowestStats, setLowestStats] = useState([]);
  const [ratingDiff, setRatingDiff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPasswordMatches, setIsPasswordMatches] = useState(false);
  const [isPasswordPlayers, setIsPasswordPlayers] = useState(false);
  const [isPasswordMatchesData, setIsPasswordMatchesData] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const correctPassword = "mixdurasso321rje";

  const fetchData = async () => {
    setLoading(true);
    try {
      const [highest, lowest, rating] = await Promise.all([
        fetchHighestStats(),
        fetchLowestStats(),
        fetchRatingDiff(),
      ]);
      setHighestStats(highest);
      setLowestStats(lowest);
      setRatingDiff(rating);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordModalOpen(false); 
      setPassword(""); 
      setErrorMessage("");
  
      
      if (isPasswordPlayers) {
        updatePlayers();
      } else if (isPasswordMatches) {
        updateMatches();
      } else if (isPasswordMatchesData) {
        updateMatchesData();
      }
    } else {
      setErrorMessage("Senha incorreta! Tente novamente.");
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchData();
  };
  const handlePlayers = () => {
    setIsPasswordPlayers(true);
    setIsPasswordMatches(false);
    setIsPasswordMatchesData(false);
    setIsPasswordModalOpen(true);
  };
  const handleMatches = () => {
    setIsPasswordMatches(true);
    setIsPasswordPlayers(false);
    setIsPasswordMatchesData(false);
    setIsPasswordModalOpen(true);
  };
  const handleMatchesData = () => {
    setIsPasswordMatches(false);
    setIsPasswordPlayers(false);
    setIsPasswordMatchesData(true);
    setIsPasswordModalOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const renderTable = (data, columns, headers) => (
    <table className="stats-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>
                {col === "nick" ? (
                  <div>
                    <img
                      src={`https://static.gamersclub.com.br/players/avatar/${row.player_id || row.idPlayer}/${row.player_id || row.idPlayer}_full.jpg`}
                      alt={`${row[col]}'s photo`}
                      className="photo-table-top"
                    />
                    <span>{row[col]}</span>
                  </div>
                ) : (
                  row[col]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="btns">
      <div className="btns">
        <button className="open-modal-button submit-button-top" onClick={handleOpen}>
          Ranking
        </button>
      </div>
      <div className="btns">
        <button className="submit-button-top" onClick={handlePlayers}>
          Carregar Players
        </button>
      </div>
      <div className="btns">
        <button className="submit-button-top" onClick={handleMatches}>
          Carregar Partidas
        </button>
      </div>
      <div className="btns">
        <button className="submit-button-top" onClick={handleMatchesData}>
          Carregar Dados Partidas
        </button>
      </div>

      {isPasswordModalOpen && (
        <div className="passwordModal">
          <div className="passwordModal-content">
            <h2>Digite a senha</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handlePasswordSubmit}>Confirmar</button>
            <button onClick={() => setIsPasswordModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={handleClose}>
              Fechar
            </button>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {/* Tabs */}
                <div className="tabs">
                  <button
                    className={`tab ${activeTab === "highest" ? "active" : ""}`}
                    onClick={() => setActiveTab("highest")}
                  >
                    Melhores Stats
                  </button>
                  <button
                    className={`tab ${activeTab === "lowest" ? "active" : ""}`}
                    onClick={() => setActiveTab("lowest")}
                  >
                    Piores Stats
                  </button>
                  <button
                    className={`tab ${activeTab === "rating" ? "active" : ""}`}
                    onClick={() => setActiveTab("rating")}
                  >
                    Pontos GC - Últimas 10 Partidas
                  </button>
                </div>

                {/* Content for Each Tab */}
                <div className="tab-content">
                  {activeTab === "highest" &&
                    renderTable(
                      highestStats,
                      [
                        "nick",
                        "stat_type",
                        "raw_stat_value"
                      ],
                      [
                        "Nick",
                        "Stat",
                        "Valor"
                      ]
                    )}
                  {activeTab === "lowest" &&
                    renderTable(
                      lowestStats,
                      [
                        "nick",
                        "stat_type",
                        "raw_stat_value"
                      ],
                      [
                        "Nickname",
                        "Stat",
                        "Valor"
                      ]
                    )}
                  {activeTab === "rating" &&
                    renderTable(
                      ratingDiff,
                      ["nick", "total_rating_diff"],
                      ["Nickname", "Total Rating Diff"]
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsModal;
