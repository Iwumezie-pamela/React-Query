// custom hook
// import axios from 'axios';

import { useQuery, useMutation, useQueryClient } from 'react-query'; //hook  for all our data fetching needs

import { request } from '../utils/axios.utils';

const fetchHeros = () => {
  // return axios.get('http://localhost:3000/superheroes');
  return request({ url: '/superheroes' });
};
// mutation
const addSuperHero = (hero) => {
  // return axios.post('http://localhost:3000/superheroes', hero);
  return request({ url: '/superheroes', method: 'post', data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    // a unique key to  identify this query
    'super-heroes',
    fetchHeros,
    {
      // cacheTime: 5000,
      // staleTime: 0, //default value
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: false, //2000 this fetches our data every 2 secs
      // enabled: false,
      onSuccess: onSuccess,
      onError: onError,
      // select: (data) => {
      //   const superHeroesName = data.data.map((hero) => hero.name);
      //   return superHeroesName;
      // },
    }

    //  OR
    // a function that returns a promise

    // () => {
    //   return axios.get('http://localhost:3000/superheroes');
    // }
  );
};

export const useAddSuperHeroData = () => {
  // query invalidation
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    //it does not necessarily need a key and it post data to the backend
    //   onSuccess: (data) => { //not needed for Optimistic Updates
    //     // queryClient.invalidateQueries('super-heroes');
    //     // Handling Mutation Response
    //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //       return {
    //         ...oldQueryData,
    //         data: [...oldQueryData.data, data.data], //oldQueryData.data refers to the array of super heroes,data.data refers to the hero object from the mutation response
    //       };
    //     }); //use to update query cache,oldQueryData refers to what is present in the query cache
    //   },
    //Optimistic Updates
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');
      const prevHeroData = queryClient.getQueryData('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });

      return {
        prevHeroData, //use to roll back data incase the mutation errors out
      };
    }, //it is called before the mutation fn  is fired and it is passed the same variable the mutation fn would receive

    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.prevHeroData);
    }, //this fn is  call if the mutation  encounters an error and it receives 3 arguments
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};

//Optimistic Updates:imply  updating the state before performing a mutation under the assumption that nothing can go wrong
