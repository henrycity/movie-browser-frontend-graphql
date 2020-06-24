import * as Types from '../../graphql-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetListQueryVariables = Types.Exact<{
  input: Types.ListInput;
}>;


export type GetListQuery = (
  { __typename?: 'Query' }
  & { list?: Types.Maybe<(
    { __typename?: 'List' }
    & Pick<Types.List, 'id'>
    & { movies: Array<Types.Maybe<(
      { __typename?: 'Movie' }
      & Pick<Types.Movie, 'id' | 'title' | 'backdrop_path' | 'poster_path'>
    )>> }
  )> }
);


export const GetListDocument = gql`
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

/**
 * __useGetListQuery__
 *
 * To run a query within a React component, call `useGetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListQuery, GetListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListQuery, GetListQueryVariables>(GetListDocument, baseOptions);
      }
export function useGetListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListQuery, GetListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListQuery, GetListQueryVariables>(GetListDocument, baseOptions);
        }
export type GetListQueryHookResult = ReturnType<typeof useGetListQuery>;
export type GetListLazyQueryHookResult = ReturnType<typeof useGetListLazyQuery>;
export type GetListQueryResult = ApolloReactCommon.QueryResult<GetListQuery, GetListQueryVariables>;