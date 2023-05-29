import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

// they can be executed in parallel so as to reduce fetching concurrency.and the situation arises when we have one query dependent on the result of another query

const getUserByEmail = (email) => {
  return axios.get(`http://localhost:3000/users/${email}`);
};

const getCourseByChannelId = (channelId) => {
  return axios.get(`http://localhost:3000/channels/${channelId}`);
};
const getCourseByChannel = () => {
  return axios.get(`http://localhost:3000/channels`);
};

const DependentQueries = ({ email }) => {
  // Get the user
  const { data: user } = useQuery(['user', email], () => getUserByEmail(email));
  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], () => getCourseByChannelId(channelId), {
    enabled: !!channelId, //only after the channel id has been retrieved fetch the channel detail (!!double negation and it returns a boolean)
  });

  // get course
  const { data: courses } = useQuery('course', getCourseByChannel);
  return (
    <>
      <h1 className='font-bold text-2xl'>Courses</h1>
      {courses?.data.map((item) => {
        return (
          <div key={item.id} className=''>
            <p className='text-xl'>{item.courses}</p>
          </div>
        );
      })}
    </>
  );
};

export default DependentQueries;
