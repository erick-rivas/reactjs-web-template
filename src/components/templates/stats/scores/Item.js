/*
__Seed builder__v1.0
*/

import * as React from 'react';
import cx from 'classnames';
import Svg from 'react-svg';
import redux from 'seed/helpers/redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from 'resources/css/templates/stats/scores/Item.module.css';

class ScoreItem extends React.Component
{
  render()
  {
    const { score } = this.props;

    return (
      <div className={styles.module}>
        <div className={styles.title}>{score.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(score)}</div>
        <Svg className={styles.options}
          src={require('resources/icons/ic_expand.svg')}
          onClick={this.onClickOptions} />
        <Menu
          anchorEl={this.state.anchorMenu}
          open={Boolean(this.state.anchorMenu)}
          onClose={this.onCloseMenu}>
          <MenuItem>Delete</MenuItem>
        </Menu>

      </div>
    );
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {
      anchorMenu: null
    }
    this.onClickOptions = this.onClickOptions.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);
  }

  onClickOptions = e =>
  {
    this.setState({
      anchorMenu: e.currentTarget
    });
  };

  onCloseMenu = e =>
  {
    this.setState({
      anchorMenu: null
    });
  };

}

export default redux(ScoreItem);