import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MovieWatchList from './MovieWatchList';
import MovieWatchListItem from './MovieWatchListItem';

const Watchlist = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:listId`} component={MovieWatchListItem} />
      <Route path={match.path} component={MovieWatchList} />
    </Switch>
  );
};

export default Watchlist;
