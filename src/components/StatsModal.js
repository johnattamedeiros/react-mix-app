import React, { useState, useEffect } from "react";
import {
  fetchHighestStats,
  fetchLowestStats,
  fetchRatingDiff,
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

  const handleOpen = () => {
    setIsOpen(true);
    fetchData();
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
    <div className="stats-modal">
      <div className="stats-modal-btn">
      <button className="open-modal-button submit-button-top" onClick={handleOpen}>
        Top/Piores Stats
      </button>
      </div>
      
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
                      [ "nick", "total_rating_diff"],
                      [ "Nickname", "Total Rating Diff"]
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
