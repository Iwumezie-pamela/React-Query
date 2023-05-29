import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:3000/superheroes');
};
const fetchFriends = () => {
  return axios.get('http://localhost:3000/friends');
};

const ParallelQueries = () => {
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);
  // ther would not be conflict this way
  return (
    <div>
      {superHeroes?.data.map((hero) => {
        const { id, name } = hero;
        return <h1 key={id}>{name}</h1>;
      })}
      <br />

      {friends?.data.map((friend) => {
        const { id, name } = friend;
        return <h1 key={id}>{name}</h1>;
      })}
    </div>
  );
};

export default ParallelQueries;
