/*
__Seed builder__v1.0
*/

import * as React from 'react';

import Loading from 'components/helpers/Loading';

import styles from 'util/css/teams/Item.module.css'

class TeamItem extends React.Component
{
  render()
  {
    const { team = {} } = this.props;

    if (team.id == null) return <Loading />
    return (
      <div className={styles.module}>

        {/* Suggested divs */}
        <div className={styles.name}>{'name:' + team.name}</div>
        <div className={styles.logoUrl}>{'logo_url:' + team.logo_url}</div>
        <div className={styles.description}>{'description:' + team.description}</div>
        <div className={styles.marketValue}>{'market_value:' + team.market_value}</div>
        <div className={styles.players}>{'players:' + team.players.reduce((lv, v) => lv + v.id + ",", "")}</div>

      </div>
    );
  }
}

export default TeamItem;
