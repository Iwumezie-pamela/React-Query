// custom hook for single hero
//and initial query data
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// const fetchHeros = (id) => {
//   return axios.get(`http://localhost:3000/superheroes/${id}`);
// };

// or

const fetchHeros = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:3000/superheroes/${id}`);
};

// export const useSingleHero = (id) => {
//   return useQuery(['super-hero', id], () => fetchHeros(id));
// }; or

export const useSingleHero = (id) => {
  // initial query data
  const queryClient = useQueryClient(); //to get hold of client instance

  return useQuery(['super-hero', id], fetchHeros, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(id)); //we are trying to get the data for the super heroes list query

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
