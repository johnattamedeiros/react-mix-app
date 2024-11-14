import React from "react";
import "../styles/TableWithPhotos.css";
import './../styles/gc.css'

const TableWithPhotos = ({ data }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th class="player-column">Player</th>
            {/* <th class="stat-column">Stats</th> */}
            <th class="normal-column">Mapa</th>
            <th class="normal-column">Pontos</th>
            <th class="normal-column">Time A</th>
            <th class="normal-column">Time B</th>
            <th class="normal-column">Resultado</th>
            <th class="normal-column">Partida</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <div class="td-container">
                  <img src={`https://static.gamersclub.com.br/players/avatar/${row.Player.id}/${row.Player.id}_full.jpg`} alt={`${row.Player.nick}'s photo`} className="photo" />
                  <div class="info">
                    <span class="name">{row.Player.nick}</span>
                    <span data-v-551cb209="" class={`gcf-new-badge-level gcf-new-badge-level-${row.Player.level}`}>
                      <span data-v-551cb209="" class="gcf-badge-level-value">{row.Player.level}
                      </span></span>
                  </div>
                </div>
              </td>
              <td>{row.map}</td>
              <td style={{ color: row.ratingDiff > 0 ? 'green' : 'red' }}>
                {row.ratingDiff > 0 ? `+${row.ratingDiff}` : row.ratingDiff}
              </td>
              <td>{row.teamNameA} - Rounds : {row.scoreA}</td>
              <td>{row.teamNameB} - Rounds : {row.scoreB}</td>
              <td style={{ color: row.win === 1 ? 'green' : 'red' }}>
                {row.win === 1 ? 'Vitória' : 'Derrota'}
              </td>
              <td>
              <a
                href={`https://gamersclub.com.br/lobby/partida/${row.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.id}
              </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithPhotos;
