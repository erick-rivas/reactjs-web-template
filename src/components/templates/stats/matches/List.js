/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as Util from 'seed/util';
import redux from 'seed/redux';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Loading from 'seed/components/helpers/Loading';

import styles from 'resources/css/templates/stats/matches/List.module.css';

class MatchList extends React.Component
{
  render()
  {
    const matches =
      Util.filter(this.props.matches, {}).sort((i1,i2) => i2.id - i1.id)
    if (matches == null) return <Loading />;

    const { Item } = this.props;
    const { url } = this.props.match;

    const matchList = matches.map(item =>
        <NavLink 
          to={`${url}/${item.id}`}
          className={styles.item}
          activeClassName={styles.active}>
          <Item 
            key={item.id} 
            id={item.id}
            match={item}/>
      </NavLink>);

    return (
      <div className={styles.module}>
        { matchList }
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
  }
  
  componentDidMount()
  {
    this.props.getMatchList({});
  }
}

export default redux(MatchList);
