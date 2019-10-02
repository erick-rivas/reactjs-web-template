/*
__Seed builder__v1.0
*/

import React, { useEffect }  from 'react';
import $ from 'jquery';
import { useQuery } from 'seed/gql'
import { NavLink } from 'react-router-dom';

import Loading from 'seed/components/helpers/Loading';

import cx from 'classnames';
import styles from 'resources/css/examples/users/Table.module.css';

const USERS  = `
{
  users {
    id
    username
    firstName
    lastName
    email
    isActive
    teams {
      id
    }
  }
}
`

function UserTable(props)
{
  const { url } = props.match;

  const qUsers = useQuery(USERS, "", {
    onCompleted: data =>
    {
      $.DataTable = require('datatables.net');
      $(`.${styles.table}`).DataTable();
    }
  });

  if (qUsers.loading) return <Loading />
  if (qUsers.error) return "Error"

  const { users } = qUsers.data

  const userTable = users.map(item =>
     <tr>
       <td>{item.id}</td>
       <td className={styles.options}>
        <NavLink
          key={item.id}
          to={`${url}/${item.id}`}
          className={styles.details}
          activeClassName={styles.active}>
          Details
        </NavLink>
       </td>
     </tr>);

  return (
    <div className={styles.module}>
      <table className={cx("hover","row-border", styles.table)}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          { userTable }
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
