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
    // Faz a consulta nas matches com base no jogador selecionado
    const fetchMatchesForPlayer = async () => {
      if (!selectedPlayer) {
        console.log("fech allmatches");
        // Caso nenhum jogador seja selecionado, carrega todas as matches
        const allMatches = await fetchMatches();
        setMatches(allMatches);
        return;
      }

      try {
        setLoading(true);
        const filteredMatches = await fetchMatches(selectedPlayer.id); // Supondo que `fetchMatches` aceite um parâmetro
        setMatches(filteredMatches);
      } catch (error) {
        console.error('Error fetching matches for player:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log("chamando matchforplayer");
    fetchMatchesForPlayer();
    console.log("chamando loadpLayers");
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
