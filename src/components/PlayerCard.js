import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      {/* <img src={player.photo} alt={`${player.name}'s photo`} className="player-photo" /> */}
      <div className="player-info">
        <h3 className="player-name">{player.id_gc}</h3>
        {/* <p className="player-stats">Kills: {player.kills}</p>
        <p className="player-stats">Deaths: {player.deaths}</p>
        <p className="player-stats">Score: {player.score}</p> */}
      </div>
    </div>
  );
};

export default PlayerCard;
