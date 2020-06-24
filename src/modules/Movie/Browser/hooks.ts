import { useRef } from 'react';

import { useGetMoviesQuery } from './MovieBrowser.graphql.generated';

const useMovies = () => {
  const { data, fetchMore } = useGetMoviesQuery({
    variables: { input: { page: 1, query: '' } },
  });

  const prevQuery = useRef('');
  const page = useRef(1);

  const loadMovies = (query: string) => {
    const isNewQuery = prevQuery.current !== query;
    if (isNewQuery) {
      page.current = 1;
      prevQuery.current = query;
    }
    return fetchMore({
      variables: { input: { page: page.current, query } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        page.current++;
        if (isNewQuery) {
          return {
            movies: [...fetchMoreResult.movies],
          };
        }
        return {
          movies: [...prev.movies, ...fetchMoreResult.movies],
        };
      },
    });
  };

  return {
    movies: data?.movies ?? [],
    loadMovies,
  };
};

export default useMovies;
