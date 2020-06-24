import gql from 'graphql-tag';

const getList = gql`
  query getList($input: ListInput!) {
    list(input: $input) {
      id
      movies {
        id
        title
        backdrop_path
        poster_path
      }
    }
  }
`;
