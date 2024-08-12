import React from 'react';
import './../styles/gc.css'

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <img src={`https://static.gamersclub.com.br/players/avatar/${player.id_gc}/${player.id_gc}_full.jpg`} alt={`${player.nick}'s photo`} className="player-photo" />


      <div className="player-info">
        <h3 className="player-name">{player.nick}</h3>
        <h3> 
            <span data-v-551cb209="" class={`gcf-new-badge-level gcf-new-badge-level-${player.level}`}>
            <span data-v-551cb209="" class="gcf-badge-level-value">{player.level}
           </span></span>
         </h3>

        <div className="player-stats"> <img src="/kill.png" class="stats-ico"/> {player.Matou}   <img src="/death.png"class="stats-ico"/> {player.Morreu} <img src="/kdr.png"class="stats-ico"/>{player.KDR}</div>
        
        {player.topBaiter && <div className="player-stats-t"> <img src="/bait.png" class="stats-ico white" /> TOP {player.topBaiter} BAITAÇEIRA</div>}
        {player.topHS && <div className="player-stats-t"> <img src="/headshot.png" class="stats-ico white" /> HEADSHOT MASTER</div>}
        {player.cafe && <div className="player-stats-t"> <img src="/cafeleite.png" class="stats-ico white" /> Café com leite</div>}
        
      </div>
    </div>
  );
};

export default PlayerCard;
