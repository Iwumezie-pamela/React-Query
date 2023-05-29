import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperHeroes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/superheroes')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className='loader'></div>;
  }

  if (error) {
    return <h2 className='font-bold text-2xl'>{error}</h2>;
  }

  return (
    <>
      <h2 className='font-bold text-2xl my-2'>
        Super Heroes Page using useState and useEffect
      </h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default SuperHeroes;
