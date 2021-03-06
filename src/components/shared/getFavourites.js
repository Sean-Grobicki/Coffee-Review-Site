import { getToken } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';

const getFavourites = async () => {
  const route = '/find?search_in=favourite';
  const token = await getToken();
  const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
  const response = await get(route, headers);
  const ids = [];
  response.data.forEach((location) => {
    ids.push(location.location_id);
  });
  return ids;
};

const isFavourite = (id, favourites) => {
  for (let index = 0; index < favourites.length; index += 1) {
    const element = favourites[index];
    if (element === id) {
      return true;
    }
  }
  return false;
};

module.exports = {
  isFavourite: isFavourite,
  getFavourites: getFavourites,
};
