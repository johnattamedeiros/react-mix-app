import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <img src={`https://static.gamersclub.com.br/players/avatar/${player.id_gc}/${player.id_gc}_full.jpg`} alt={`${player.nick}'s photo`} className="player-photo" />

      
      <div className="player-info">
        <h3 className="player-name">{player.nick}</h3>
        <p className="player-stats">Kills: {player.Matou}</p>
        <p className="player-stats">Deaths: {player.Morreu}</p>
        <p className="player-stats">Score: {player.KDR}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
