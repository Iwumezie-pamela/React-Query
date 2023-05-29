import React from 'react';
import { useParams } from 'react-router-dom';
import { useSingleHero } from '../hooks/useSingleHero';

const RQSuperHero = () => {
  const { id } = useParams();

  const { isLoading, isError, error, data } = useSingleHero(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}{' '}
    </div>
  );
};

export default RQSuperHero;

// "colors": [
//   {
//     "id": 1,
//     "label": "red"
//   },
//   {
//     "id": 2,
//     "label": "blue"
//   },
//   {
//     "id": 3,
//     "label": "green"
//   },
//   {
//     "id": 4,
//     "label": "yellow"
//   },
//   {
//     "id": 5,
//     "label": "black"
//   },
//   {
//     "id": 6,
//     "label": "white"
//   },
//   {
//     "id": 7,
//     "label": "orange"
//   },
//   {
//     "id": 8,
//     "label": "purple"
//   }
// ]
