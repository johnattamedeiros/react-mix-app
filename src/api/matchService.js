const API_URL = 'http://mixdurasso.com:3000/api/matches';

export const fetchMatches = async (idPlayer) => {
  if(idPlayer){
    console.log("buscando faewcshc"+idPlayer);
  	
  }
  
  const url = idPlayer ? `${API_URL}?idPlayer=${idPlayer}` : API_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const matches = await response.json();
  return matches;
};
