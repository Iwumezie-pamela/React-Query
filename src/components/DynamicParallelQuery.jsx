import axios from 'axios';
import { useQueries } from 'react-query';
// fetch one single hero
const fetchSuperHeroes = (id) => {
  return axios.get(`http://localhost:3000/superheroes/${id}`);
};
// fetch data for multiple heroes
const DynamicParallelQuery = ({ ids }) => {
  const queryResults = useQueries(
    ids.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallelQuery</div>;
};

export default DynamicParallelQuery;
