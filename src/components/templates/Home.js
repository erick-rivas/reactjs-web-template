/*
__Seed builder__v1.0
*/

import * as React from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import UserPanel from 'components/templates/users/Panel';
import TeamPanel from 'components/templates/teams/Panel';
import PlayerPanel from 'components/templates/players/Panel';
import MatchPanel from 'components/templates/matches/Panel';
import ScorePanel from 'components/templates/scores/Panel';
import Sidenav from 'components/templates/nav/Sidenav'
import Topnav from 'components/templates/nav/Topnav'

import c from 'resources/css/templates/Home.module.css';

class Home extends React.Component
{
  render()
  {
    const { path } = this.props.match;

    return (
      <div className={c.module}>
        <div className={c.drawer}>
          <div className={c.sidenav}>
            <Route path={`${path}`}
              component={Sidenav} />
          </div>
        </div>
        <div className={c.container}>
          <div className={c.topnav}>
            <Route path={`${path}`}
              component={Topnav} />
          </div>
          <div className={c.content}>
             <Switch>
               <Route
                 path={`${path}/users`}
                 component={UserPanel} />
               <Route
                 path={`${path}/teams`}
                 component={TeamPanel} />
               <Route
                 path={`${path}/players`}
                 component={PlayerPanel} />
               <Route
                 path={`${path}/matches`}
                 component={MatchPanel} />
               <Route
                 path={`${path}/scores`}
                 component={ScorePanel} />
             </Switch>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    if (userId == null)
      return this.props.history.replace('/templates/login');
  }
}

export default redux(Home);
