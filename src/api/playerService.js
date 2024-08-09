const API_URL = 'http://mixdurasso.vps-kinghost.net:3000/players';

export const fetchPlayers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let players = await response.json();



  const responseBaiter = await fetch("http://mixdurasso.vps-kinghost.net:3000/players/stat?sort=how_baiter&order=asc");
  if (!responseBaiter.ok) {
    throw new Error('Network response was not ok');
  }
  let topBaiters = await responseBaiter.json();

  for (let i = 0; i < players.length; i++) {
    if(players[i]._id === topBaiters[0]._id){
      players[i].topBaiter = 1;
    }
    if(players[i]._id === topBaiters[1]._id){
      players[i].topBaiter = 2;
    }
    if(players[i]._id === topBaiters[2]._id){
      players[i].topBaiter = 3;
    }
  }
  return players;
};
