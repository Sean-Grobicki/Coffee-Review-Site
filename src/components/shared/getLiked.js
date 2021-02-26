import { getToken, getUserID } from '../../api/asyncStorage';
import { get } from '../../api/apiRequests';

const getLiked = async () => {
  const id = await getUserID();
  const token = await getToken();
  const route = '/user/'.concat(id);
  const headers = { 'X-Authorization': token, 'Content-Type': 'application/json' };
  const response = await get(route, headers);
  const reviews = response.data.liked_reviews;
  const ids = [];
  reviews.forEach((review) => {
    ids.push(review.review.review_id);
  });
  return ids;
};

const isLiked = (id, liked) => {
  for (let index = 0; index < liked.length; index += 1) {
    const element = liked[index];
    if (element === id) {
      return true;
    }
  }
  return false;
};

module.exports = {
  isLiked: isLiked,
  getLiked: getLiked,
};
