import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({ pageParam = 1 }) => {
  //page Number view first page by default
  return axios.get(`http://localhost:3000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQuery = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    //we do not need the  last page  hence the underscore while pages refers to an array of api responses where each response corresponds to fetching 2 colors at a time
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1; // increase page number
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => fetchNextPage()}
          // disable if has next page is false
          disabled={!hasNextPage}
        >
          Load more
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? (
          <div className='loader'></div>
        ) : null}
      </div>
    </>
  );
};

export default InfiniteQuery;
