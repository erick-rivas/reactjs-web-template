/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as DataUtil from 'seed/util/DataUtil';
import cx from 'classnames';
import redux from 'seed/helpers/redux';
import { NavLink } from 'react-router-dom';

import Loading from 'seed/components/helpers/Loading';

import styles from 'resources/css/templates/users/List.module.css';

class UserList extends React.Component
{
  render()
  {
    const { users = [] } = this.props;
    if (users == null) return <Loading />;

    const { Item } = this.props;
    const { url } = this.props.match;

    const userList = users.map(item =>
        <NavLink 
          to={`${url}/${item.id}`}
          className={styles.item}
          activeClassName={styles.active}>
          <Item 
            key={item.id} 
            id={item.id}
            user={item}/>
      </NavLink>);

    return (
      <div className={styles.module}>
        { userList }
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
    this.props.getUserList();
  }
}

export default redux(UserList);
