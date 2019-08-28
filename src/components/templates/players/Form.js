/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as Util from 'seed/util';
import redux from 'seed/redux';
import cx from 'classnames';
import { Formik, Field } from 'formik';

import MultiField from 'seed/components/helpers/MultiField'
import FileField from 'seed/components/helpers/FileField'
import Loading from 'seed/components/helpers/Loading';

import styles from 'resources/css/templates/players/Form.module.css';

class PlayerForm extends React.Component
{
  render()
  {
    const playerId = this.getPlayerId();
    const player = Util.get(this.props.players, playerId);
    const teams = Util.filter(this.props.teams, {})

    if (player.id == null && playerId != null) return <Loading />;
    
    return (
      <div className={styles.module}>

        <div className={styles.header}>Player</div>

        <div className={styles.form}>

          <Formik
             initialValues={player}
             onSubmit={this.onSubmit}
             render={f => (

          <form onSubmit={f.handleSubmit}>
            {/* name */}
            <label className={cx(styles.lbl, styles.nameLbl)}>Name</label><br/>
            <Field type="text" name="name" className={cx(styles.txt, styles.nameTxt)} />
            <br/>
            {/* photo */}
            <label className={cx(styles.lbl, styles.photoLbl)}>Photo</label><br/>
            <FileField name="photo" className={cx(styles.fil, styles.photoFil)} accept="image/*" setFieldValue={f.setFieldValue}/>
            { f.values.photo ?
              <img src={f.values.photo.url} className={cx(styles.img, styles.photoImg)} /> : null }
            {/* is_active */}
            <label className={cx(styles.lbl, styles.isActiveLbl)}>Is active</label>
            <Field name="is_active" type="checkbox" className={cx(styles.chk, styles.isActiveChk)} />
            <br/>
            {/* team */}
            <div>
            <label className={cx(styles.lbl, styles.teamLbl)}>Team</label>
            <Field component="select" name="team_id" className={cx(styles.ops, styles.teamOps)} >
              <option value="">Select an option</option>
              { teams.map((e, idx) => <option value={e.id}>{e.id}</option>) }
            </Field>
            <br/>
            </div>
            {this.renderError()}
            <button type="submit" className={styles.submit}>Send</button>
          </form>
          )}
          />
        </div>
      </div>
    );
  }

  renderError()
  {
    const { error } = this.state;
    return (error ? <div className={styles.error}>{error}</div> : null);
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount()
  {
    const playerId = this.getPlayerId();
    if (playerId != null) 
      this.loadData();
    this.loadFkData();
  }

  /* Events */

  onSubmit(values)
  {
    const onSave = res =>
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    const playerId = this.getPlayerId();
    if (playerId == null) this.props.savePlayer(values, onSave)
    else this.props.setPlayer(playerId, values, onSave);
  }

  onSave(res)
  {
    const { url } = this.props.match
    const backUrl = url.substring(0, url.lastIndexOf('/'));
    this.props.history.push(backUrl);
  }

  onError(error)
  {
    this.setState({
      error: 'An error has occurred, try again'
    });
  }

  /* Actions */

  loadData()
  {
    const playerId = this.getPlayerId();
    this.props.getPlayerDetails(playerId);
  }

  loadFkData() 
  {
    this.props.getTeamList({});
  }

  /* Args */

  getPlayerId() 
  {
    return this.props.playerId ?
      this.props.playerId :
      this.props.match.params.player_id;
  }
}

export default redux(PlayerForm);
