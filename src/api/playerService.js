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

  const responseHS = await fetch("http://mixdurasso.vps-kinghost.net:3000/players/stat?sort=HS&order=asc");
  if (!responseBaiter.ok) {
    throw new Error('Network response was not ok');
  }

  let topHS = 0;
  let idTopHs = 0;
  let cafeleite = 5000;
  let idCafeLeite = 0;

  for (let i = 0; i < players.length; i++) {
    let calcCafeleite =  players[i].KDR * players[i].KAST;
    
    if(calcCafeleite < cafeleite){
      cafeleite = calcCafeleite;
      players[idCafeLeite].cafe=false;
      idCafeLeite=i;
      players[i].cafe = true;
    }else{
      players[i].cafe = false;
    }


    let calcPlayerHs = players[i].HS * players[i].matchesCount;
    if(calcPlayerHs > topHS){
      topHS = calcPlayerHs;
      players[idTopHs].topHS=false;
      idTopHs=i;
      players[i].topHS = true;
    }else{
      players[i].topHS = false;
    }



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
