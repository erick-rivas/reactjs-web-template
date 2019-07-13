/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as DataUtil from 'seed/util/DataUtil.js';
import cx from 'classnames';
import redux from 'seed/helpers/redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

/* Suggest: include subviews
import TeamView from 'components/teams/nav/View';
*/
import Loading from 'components/helpers/Loading';

import styles from 'resources/css/players/Details.module.css';

class PlayerDetails extends React.Component
{
  render()
  {
    const { players = [] } = this.props;
    const playerId = this.getPlayerId();
    const player = DataUtil.getItem(players, playerId);
      
    if (player.id == null) return <Loading />;

    const { path, url } = this.props.match;
    
    return (
      <div className={styles.module}>
        {/* Suggested divs */}
        <label className={cx(styles.lbl, styles.nameLbl)}>Name</label><br/>
        <label className={cx(styles.txt, styles.nameTxt)}>{player.name.toString()}</label>
        <br/>
        <label className={cx(styles.lbl, styles.photoLbl)}>Photo</label><br/>
        <img src={player.photo.url} className={cx(styles.img, styles.photoImg)}></img>
        <br/>
        <label className={cx(styles.lbl, styles.isActiveLbl)}>Is active</label><br/>
        <label className={cx(styles.txt, styles.isActiveTxt)}>{player.is_active.toString()}</label>
        <br/>
        {/* Suggest: include subviews
        <label className={cx(styles.lbl, styles.teamLbl)}>Team</label><br/>
        <label className={cx(styles.txt, styles.teamTxt)}>{player.team_id}</label>
        <br/>
        */ }
      </div>
    );
  }

  /*
  * Business logic
  */

  constructor(props)
  {
    super(props);
    this.state = {};
  }

  componentDidMount()
  {
    this.loadData();
  }

  loadData = () =>
  {
    const { getPlayerDetails } = this.props;
    const playerId = this.getPlayerId()
    getPlayerDetails(playerId);
  }

  /* Args */

  getPlayerId() 
  {
    const { player_id } = this.props.match.params;
    const { playerId } = this.props;
    return player_id ? player_id : playerId;
  }
}

export default redux(PlayerDetails);
