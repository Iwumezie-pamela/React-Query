// in react query mutation are what we use to create or delete data
import { useState } from 'react';
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from '../hooks/useSuperHeroesData';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';

const RQSuperHeroes = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log({ data });
  };
  const onError = (error) => {
    console.log({ error });
  };

  // it requires at least 2 argument
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isError: iserror,
    isLoading: Loading,
    error: Error,
  } = useAddSuperHeroData(); //if we have multiple value we can use an alias i.e mutate:addHero

  if (isLoading) {
    return <BeatLoader color='#36d7b7' />;
  }

  if (isError) {
    return <h2 className='font-bold text-2xl'>{error.message}</h2>;
  }

  const handleAddHeroClick = (e) => {
    e.preventDefault();
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
    setName('');
    setAlterEgo('');
  };

  return (
    <>
      <h2 className='font-bold text-2xl my-2'>
        Super Heroes Page using reactQuery
      </h2>

      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      {/* custom hook */}
      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroes;
