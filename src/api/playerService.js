const API_URL = 'http://localhost:3000/players'; // Substitua pelo URL real da API

export const fetchPlayers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
