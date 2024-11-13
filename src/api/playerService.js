const API_URL = 'http://mixdurasso.com:3000/api/matches';

export const fetchPlayers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let players = await response.json();

  console.log(players);
  return players;
};
