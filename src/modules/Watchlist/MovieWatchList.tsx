import React, { CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { css } from '@emotion/core';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { useHistory, Link } from 'react-router-dom';

import { useGetListsQuery } from '../Movie/MovieItem/MovieItem.graphql.generated';
import LoadingIndicator from '../../components/LoadingIndicator';

const MovieWatchList = () => {
  // TODO: Find out why add default cache doesn't trigger query request
  const { loading, data } = useGetListsQuery({ fetchPolicy: 'cache-and-network' });
  const history = useHistory();

  if (loading || !data) {
    return <LoadingIndicator />;
  }

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const movie = data.lists[index];
    return (
      <Link to={`list/${String(movie.id)}`}>
        <div
          style={style}
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            :hover {
              background-color: #f5f5f5;
            }
          `}
        >
          {data.lists[index].name} ({data.lists[index].movies.length})
        </div>
      </Link>
    );
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleGoBack}>
            <ArrowBackIos />
          </Button>
        </Toolbar>
      </AppBar>
      <List
        css={css`
          margin: 10% auto;
        `}
        height={500}
        itemCount={data.lists.length}
        itemSize={50}
        width={300}
      >
        {Row}
      </List>
    </>
  );
};

export default MovieWatchList;
