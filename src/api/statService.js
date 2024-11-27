const BASE_API_URL = 'http://mixdurasso.com:3000/api/player';
const BASE_API_URL_UPDATE = 'http://mixdurasso.com:3000/api';

/**
 * Fetch highest stats for players.
 * @returns {Promise<Array>} List of players with highest stats.
 */
export const updatePlayers = async () => {
  const response = await fetch(`${BASE_API_URL_UPDATE}/update-players`);
  if (!response.ok) {
    throw new Error('Failed to update players.');
  }
  return response.json();
};
export const updateMatches = async () => {
  const response = await fetch(`${BASE_API_URL_UPDATE}/update-matches`);
  if (!response.ok) {
    throw new Error('Failed to update matches.');
  }
  return response.json();
};
export const updateMatchesData = async () => {
  const response = await fetch(`${BASE_API_URL_UPDATE}/update-matches-data`);
  if (!response.ok) {
    throw new Error('Failed to update matches data');
  }
  return response.json();
};

/**
 * Fetch lowest stats for players.
 * @returns {Promise<Array>} List of players with lowest stats.
 */
export const fetchLowestStats = async () => {
  const response = await fetch(`${BASE_API_URL}/lowest-stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch lowest stats.');
  }
  return response.json();
};

/**
 * Fetch rating difference stats for players.
 * @returns {Promise<Array>} List of players with rating differences.
 */
export const fetchRatingDiff = async () => {
  const response = await fetch(`${BASE_API_URL}/rating-diff`);
  if (!response.ok) {
    throw new Error('Failed to fetch rating diff stats.');
  }
  return response.json();
};

export const fetchHighestStats = async () => {
  const response = await fetch(`${BASE_API_URL}/highest-stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch highest stats.');
  }
  return response.json();
};
