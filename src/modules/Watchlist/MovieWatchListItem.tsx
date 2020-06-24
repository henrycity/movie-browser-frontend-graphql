import React, { CSSProperties } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { css } from '@emotion/core';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory, useParams } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';
import { useGetListQuery } from './Watchlist.graphql.generated';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const COLUMN_COUNT = 4;

const MovieWatchListItem = () => {
  const { listId } = useParams();
  const history = useHistory();
  const { loading, data } = useGetListQuery({ variables: { input: { id: parseInt(listId) } } });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data?.list) {
    return <div>No List with that id</div>;
  }

  const Cell = ({ rowIndex, columnIndex, style }: { rowIndex: number; columnIndex: number; style: CSSProperties }) => {
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
    const movie = data.list!.movies[itemIndex];
    if (movie) {
      const picturePath = movie.backdrop_path || movie.poster_path || '';
      return (
        <div style={style}>
          <Link to={`/movie/${movie.id}`}>
            <img
              css={css`
                width: 475px;
                height: 275px;
              `}
              alt={movie.title}
              src={`${IMAGE_URL}${picturePath}`}
            />
          </Link>
        </div>
      );
    } else {
      return null;
    }
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
      <Grid
        css={css`
          margin: 5% auto;
        `}
        columnCount={COLUMN_COUNT}
        columnWidth={500}
        height={1500}
        rowCount={Math.ceil(data.list!.movies.length / COLUMN_COUNT)}
        rowHeight={300}
        width={2000}
      >
        {Cell}
      </Grid>
    </>
  );
};

export default MovieWatchListItem;
