/*
__Seed builder__v1.0
*/

import * as React from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import Svg from 'react-svg';
import { Link } from 'react-router-dom';

import styles from 'resources/css/templates/stats/matches/options/Details.module.css';

class MatchDetailsOptions extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    
    return (
      <div className={styles.module}>
        <Svg className={styles.back}
          src={require('resources/icons/ic_arrow_back.svg')}
          onClick={this.onClickBack} />
         <div className={styles.options}>
          <Link to={`${url}/edit`} className={cx(styles.btn, styles.edit)}>Edit</Link>
          <button className={cx(styles.btn, styles.delete)} onClick={this.onClickDelete}>Delete</button>
        </div>
      </div>
    );
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {};
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }

  /* Events */

  onClickBack()
  {
    const { url } = this.props.match
    const backUrl = url.substring(0, url.lastIndexOf('/'));
    this.props.history.push(backUrl);
  }

  onClickDelete()
  {
    const onDelete = res =>
    {
      if (res.ok) this.onDelete(res.body);
      else this.onDeleteError(res.body);
    };
    const matchId = this.getMatchId();
    this.props.deleteMatch(matchId, onDelete);
  }

  onDelete(res)
  {
    //Suggested method
    const { url } = this.props.match
    const backUrl = url.substring(0, url.lastIndexOf('/'));
    this.props.history.push(backUrl);
  }

  onDeleteError(error)
  {
    //Suggested method
    const { url } = this.props.match
    const backUrl = url.substring(0, url.lastIndexOf('/'));
    this.props.history.push(backUrl);
  }

  /* Args */

  getMatchId() 
  {
    return this.props.matchId ?
      this.props.matchId :
      this.props.match.params.match_id;
  }
}

export default redux(MatchDetailsOptions);
