import React from "react";
import "../styles/TableWithPhotos.css";
import './../styles/gc.css'

const TableWithPhotos = ({ data }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Partida</th>
            <th>Mapa</th>
            <th>Pontos</th>
            <th>Time A</th>
            <th>Time B</th>
            <th>Resultado</th>
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
              
              <td>{row.id}</td>
              <td>{row.map}</td>
              <td style={{ color: row.ratingDiff > 0 ? 'green' : 'red' }}>
                {row.ratingDiff > 0 ? `+${row.ratingDiff}` : row.ratingDiff}
              </td>
              <td>{row.teamNameA} - Rounds : {row.scoreA}</td>
              <td>{row.teamNameB} - Rounds : {row.scoreB}</td>
              <td style={{ color: row.win === 1 ? 'green' : 'red' }}>
                {row.win === 1 ? 'Vitória' : 'Derrota'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithPhotos;
