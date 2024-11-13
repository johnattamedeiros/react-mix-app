import React, { useEffect, useState } from 'react';
import TableWithPhotos from '../components/TableWithPhotos';
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


  return (
    <div className="home-page">
      <Home/>
      <TableWithPhotos data={players} />
    </div>
  );
};

export default HomePage;
