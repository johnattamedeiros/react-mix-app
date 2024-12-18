import React, { useEffect, useState } from 'react';
import TableWithPhotos from '../components/TableWithPhotos';
import AddAccount from '../components/AddAccount';
import StatsModal from '../components/StatsModal';
import Filter from '../components/Filter';
import { fetchMatches } from '../api/matchService';
import { fetchPlayers } from '../api/playerService';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const players = await fetchPlayers();
        setPlayers(players);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMatchesForPlayer = async () => {
      if (!selectedPlayer) {
        const allMatches = await fetchMatches();
        setMatches(allMatches);
        return;
      }

      try {
        setLoading(true);
        const filteredMatches = await fetchMatches(selectedPlayer.id);
        setMatches(filteredMatches);
      } catch (error) {
        console.error('Error fetching matches for player:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchesForPlayer();
    loadPlayers();
  }, [selectedPlayer]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
           <img
              src="https://static.gamersclub.com.br/assets/header/gamersclub-hrz-w.svg"
              alt="Gamers Club"
              className="modal-image"
            />
      
      
      <Filter
        options={players}
        selectedValue={selectedPlayer}
        onChange={(playerId) => setSelectedPlayer(playerId)}
      />
      <AddAccount />
      <StatsModal />

      <TableWithPhotos data={matches} />
    </div>
  );
};

export default HomePage;
