/*
__Seed builder__v1.0
*/

import React from 'react';
import { useDelete } from 'seed/gql';
import * as queries from 'seed/gql/queries';
import { Link } from 'react-router-dom';
import Svg from 'react-svg';

import cx from 'classnames';
import styles from 'resources/css/examples/users/options/Details.module.css';

function UserDetailsOptions(props)
{
    const { url } = props.match;
    const { user_id } = props.match.params;

    const [callDelete, qDelete] = useDelete(queries.DELETE_USER,
    {
      onCompleted: data =>
      {
        const backUrl = url.substring(0, url.lastIndexOf('/'));
        props.history.push(backUrl);
       }
    })

    const onClickDelete = () =>
      callDelete({ id: user_id })

    const onClickBack = () =>
    {
      const backUrl = url.substring(0, url.lastIndexOf('/'));
      props.history.push(backUrl);
    }

    return (
      <div className={styles.module}>
        <Svg className={styles.back}
          src={require('resources/icons/ic_arrow_back.svg')}
          onClick={onClickBack} />
         <div className={styles.options}>
          <Link to={`${url}/edit`} className={cx(styles.btn, styles.edit)}>Edit</Link>
          <button className={cx(styles.btn, styles.delete)} onClick={onClickDelete}>Delete</button>
        </div>
      </div>
    );
}

export default UserDetailsOptions;