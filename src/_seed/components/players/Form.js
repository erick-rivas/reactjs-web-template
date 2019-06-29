/*
__Seed builder__v1.0
  (Read_only) Modify via SeedManifest.yaml
*/

import * as React from 'react';

import * as DataUtil from 'util/DataUtil';

import styles from 'util/css/players/Form.module.css';

class _PlayerForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      player: {
        team_id: this.getTeamId(),
      },
      filters: {
        user_id: this.getUserId(),
        team_id: this.getTeamId(), 
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhotoUrlChange = this.onPhotoUrlChange.bind(this);
    this.onIsActiveChange = this.onIsActiveChange.bind(this);
    this.onTeamChange = this.onTeamChange.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
    this.loadFkData();
  }

  loadData = () =>
  {
    const { getPlayerDetails } = this.props;
    const playerId = this.getPlayerId();
    if (playerId != null) {
      const callback = res => 
      {
        const playerId = this.getPlayerId();
        const player = DataUtil.getItem(this.props.players, playerId);
        if (player.id != null)
          this.setState({
            player: Object.assign({}, this.state.player, player)
          })
      }
      getPlayerDetails(playerId, callback);
    }
  }

  loadFkData = () => 
  {
    const { getTeamList } = this.props;
    getTeamList(this.state.filters);
  }

  fillData = e =>
  {
    let player = this.state.player ? this.state.player : {};
    player.name = player.name ? player.name : e.target.name.value;
    player.photo_url = player.photo_url ? player.photo_url : e.target.photoUrl.value;
    player.is_active = player.is_active ? player.is_active : e.target.isActive.checked;
    player.team_id = player.team_id ? player.team_id : e.target.team.value;

    this.setState({
      player: player
    });
  }

  saveData = e =>
  {
    const { savePlayer, setPlayer } = this.props;
    const playerId = this.getPlayerId();
    const onSave = res => 
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    if (playerId == null && savePlayer != null)
      savePlayer(this.state.player, onSave)
    if (playerId != null && setPlayer != null)
      setPlayer(playerId, this.state.player, onSave);
  }

  /* Props */

  onSave(res) {}
  onError(error) {}

  /* Args */

  getPlayerId() 
  {
    const { player_id } = this.props.match.params;
    const { playerId } = this.props;
    return player_id ? player_id : playerId;
  }

  /* Filters */

  getUserId()
  {
    const { user_id } = this.props.match.params;
    const { userId } = this.props;
    return user_id == 0 ? sessionStorage.getItem('id') : 
           user_id ? user_id : 
           userId;
  }
  getTeamId()
  {
    const { team_id } = this.props.match.params;
    const { teamId } = this.props;
    return team_id ? team_id : teamId;
  }  

  /* Events */

  onSubmit(e)
  {
    e.preventDefault();
    this.fillData(e);
    this.saveData(e);
  }
  
  onNameChange(e)
  {
    let player = this.state.player ? this.state.player : {};
    player.name = e.target.value;  
    this.setState({
      player: player
    });
  }
  
  onPhotoUrlChange(e)
  {
    let player = this.state.player ? this.state.player : {};
    player.photo_url = e.target.value;  
    this.setState({
      player: player
    });
  }
  
  onIsActiveChange(e)
  {
    let player = this.state.player ? this.state.player : {};
    player.is_active = e.target.checked;  
    this.setState({
      player: player
    });
  }
  
  onTeamChange(e)
  {
    let player = this.state.player ? this.state.player : {};
    player.team_id = e.target.value;
    this.setState({
      player: player
    });
  }

  /* Components */

  renderError()
  {
    const { error } = this.state;
    return ( 
    error ? <div className={styles.error}>{error}</div> : null
    );
  }
}

export default _PlayerForm;