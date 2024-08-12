import React, { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import Home from '../components/Home';
import { fetchPlayers } from '../api/playerService';

const HomePage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const playerCards = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    playerCards.push(<PlayerCard key={player.id} player={player} />);
  }

  return (
    <div className="home-page">
      <Home/>
      {playerCards}
    </div>
  );
};

export default HomePage;
